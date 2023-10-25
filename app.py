from flask import Flask
import views


app = Flask(__name__)

app.register_blueprint(views.blueprint)


if __name__ == '__main__':
    app.run(debug=True)