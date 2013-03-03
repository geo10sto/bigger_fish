from flask import Flask, session, jsonify, redirect, url_for, session, request, render_template
from flask_oauth import OAuth
import json

SECRET_KEY = 'development key'
DEBUG = True
FACEBOOK_APP_ID = '338495066272125'
FACEBOOK_APP_SECRET = 'a093fcf9db76103bd46873840d3534f6'


app = Flask(__name__)
app.debug = DEBUG
app.secret_key = SECRET_KEY
oauth = OAuth()

facebook = oauth.remote_app('facebook',
    base_url='https://graph.facebook.com/',
    request_token_url=None,
    access_token_url='/oauth/access_token',
    authorize_url='https://www.facebook.com/dialog/oauth',
    consumer_key=FACEBOOK_APP_ID,
    consumer_secret=FACEBOOK_APP_SECRET,
    request_token_params={'scope': 'email'}
)

@app.route('/')
def index():
    return render_template('index.html')
    #return redirect(url_for('login'))

@app.route('/company')
def company():
    return render_template('company.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

# @app.route('/login', methods=['POST'])
# def login():
#     if request.method == 'POST':
#         import ipdb; ipdb.set_trace()
#         print facebook.authorize(callback=url_for('facebook_authorized'))
#         return jsonify({"status": "OK", "message": "loggedIn"})

@app.route('/login')
def login():
    return facebook.authorize(callback='http://127.0.0.1:5000'+url_for('wizard',
        next=request.args.get('next') or request.referrer or None,
        _external=False))


@app.route('/wizard')
@facebook.authorized_handler
def wizard(resp):
    if resp is None:
        return 'Access denied: reason=%s error=%s' % (
            request.args['error_reason'],
            request.args['error_description']
        )
    session['oauth_token'] = (resp['access_token'], '')
    me = facebook.get('/me')

    request.data = {'picture': 'http://graph.facebook.com/%s/picture?type=large' % me.data['username'],
        'first_name': me.data['first_name'], 'last_name': me.data['last_name']}

    return render_template('wizard.html', **request.data)

@facebook.tokengetter
def get_facebook_oauth_token():
    return session.get('oauth_token')

if __name__ == '__main__':
    app.run()