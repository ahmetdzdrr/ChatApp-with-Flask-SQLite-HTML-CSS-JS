import secrets
from config import Config
from flask_mail import Mail, Message
from flask_bcrypt import Bcrypt
from models import db, User, Room, Participants
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from flask_socketio import join_room, leave_room, send, SocketIO
from flask import Flask, render_template, request, flash, redirect, url_for, jsonify



app = Flask(__name__)
app.config.from_object(Config)
bcrypt = Bcrypt(app)
socket_io = SocketIO(app)
mail = Mail(app)
db.init_app(app) 
    


login_manager = LoginManager()
login_manager.login_view = 'login'
login_manager.init_app(app)



@login_manager.user_loader
def load_user(id):
    return User.query.get(int(id))



@app.route('/')
def home():
    return render_template('home.html')







@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        re_password = request.form.get('re_password')
        user_mail = request.form.get('user_mail')

        existing_user = User.query.filter((User.username == username) | (User.mail == user_mail)).first()

        if existing_user:
            flash('Username or email cannot be used!', 'error')
        else:
            if password != re_password:
                flash('Passwords don\'t match!', 'error')
            elif (len(password)<8 or len(re_password)<8):
                flash('Passwords too short!', 'error')
            else:
                verification_code = secrets.token_urlsafe(32)
                hashed_password = bcrypt.generate_password_hash(re_password).decode('utf-8')
                new_user = User(username=username, password=hashed_password, mail=user_mail, verification_code=verification_code)
                db.session.add(new_user)
                db.session.commit()

                msg = Message('Email Verification', sender='no_reply@gmail.com', recipients=[user_mail])
                verification_url = url_for('verify_email', verification_code=verification_code, _external=True)
                html_content = render_template('mail.html', verification_url=verification_url)
                msg.html = html_content
                mail.send(msg)

                flash('Please check your email for the verification link.', 'success')
            
    return render_template('register.html', user=current_user, user_email = mail)








@app.route('/verify_email/<verification_code>')
def verify_email(verification_code):
    user = User.query.filter_by(verification_code=verification_code).first()
    if user:
        user.check_mail = True
        db.session.commit()
        flash('Email verification successful!', 'success')
        return redirect(url_for('home'))
    else:
        flash('Invalid verification code', 'error')
        return redirect(url_for('register'))







@app.route('/confirm', methods=['GET', 'POST'])
def confirm():
    if request.method == 'POST':
        mail = request.form['mail']
        re_password = request.form['password']
        new_password = request.form['new_password']

        user = User.query.filter((User.mail == mail)).first()

        
        if (re_password==new_password):

            if ((len(new_password) >= 8) and (len(re_password) >= 8)):
                hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')

                if user:
                    user.password = hashed_password
                    db.session.commit()
                    flash("Password change is successful!", 'success')
                else:
                    flash('No such user found', 'error')

            else:
                flash("Password too short!", 'error')

        else:
            flash('Passwords do not match!', 'error')
        
    return render_template('confirm.html')







@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        user = User.query.filter_by(username=username).first()

        if user and bcrypt.check_password_hash(user.password, password):
            if user.check_mail:
                flash('Login successful!', 'success')
                login_user(user, remember=True)
                return redirect(url_for('menu'))
            else:
                flash('Email not verified! Please check your email for the verification link!', 'error')
        else:
            flash('Username or password wrong!', 'error')


    return render_template('login.html', user=current_user)






@app.route('/menu', methods=['GET', 'POST'])
@login_required
def menu():
    if request.method == 'POST':
        room_name = request.form.get('room-name')
        code = request.form.get('code')
        room_password = request.form.get('password')

        existing_room = Room.query.filter_by(room_name=room_name).first()

        if existing_room:
            flash('Room name already exists!', 'error')
        else:
            if len(room_password) < 8:
                flash('Password too short!', 'error')
            else:
                hashed_room_password = bcrypt.generate_password_hash(room_password).decode('utf-8')
                new_room = Room(room_name=room_name, room_code=code, room_password=hashed_room_password, admin_id=current_user.id)
                db.session.add(new_room)
                db.session.commit()

        flash('Room created successfully!', 'success')
                
    all_rooms = Room.query.all()

    room_data = [{'id': room.id, 'name': room.room_name, 'code': room.room_code, 'admin_id': room.admin_id} for room in all_rooms]

    return render_template('menu.html', user=current_user, rooms=room_data)







@app.route('/delete_room/<int:room_id>', methods=['DELETE'])
@login_required
def delete_room(room_id):
    room_to_delete = Room.query.filter_by(id=room_id).first()

    if room_to_delete:
        if room_to_delete.admin_id == current_user.id:
            db.session.delete(room_to_delete)
            db.session.commit()
            return jsonify({'message': 'Room deleted successfully'}), 200
        else:
            return jsonify({'error': 'Unauthorized to delete this room'}), 403
    else:
        return jsonify({'error': 'Room not found'}), 404







@app.route('/join', methods=['GET', 'POST'])
@login_required
def join_room():
    room_code = request.form.get('room-code')
    room_password = request.form.get('password')

    room = Room.query.filter_by(room_code=room_code).first()

    if room and bcrypt.check_password_hash(room.room_password, room_password):
        return redirect(url_for('room', room_name=room.room_name))

    all_rooms = Room.query.all()
    room_data = [{'id': room.id, 'name': room.room_name, 'code': room.room_code, 'admin_id': room.admin_id} for room in all_rooms]

    return render_template('join.html', user=current_user, rooms=room_data)






@app.route('/room/<room_name>')
@login_required
def room(room_name):
    return render_template('room.html', room_name=room_name)







@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Logged Out!', 'success')
    return redirect(url_for('login'))
    





if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    socket_io.run(app, debug=True, port=8080)

