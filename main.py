from flask import Flask, render_template

app = Flask(__name__)

TASKS = ["Drink water","Eat food","DO work","Get sleep"]

@app.route("/")
def index():
    return render_template("home.html",task= TASKS)

if __name__ == "__main__":
    app.run(host="0.0.0.0",debug=True)