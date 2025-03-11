from flask import Flask, render_template, request
import json

app = Flask(__name__)

# Load timetable data
with open('timetable.json', 'r') as f:
    timetable_data = json.load(f)

DEPTS = ['Computer Engineering', 'Information Technology', 'Mechanical Engineering',
         'Civil Engineering', 'Bio-medical Engineering']
DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
period_to_slot = {0: 1, 1: 2, 3: 3, 4: 4, 6: 5, 7: 6}
time_slots = ["8:00-9:00", "9:00-10:00", "10:00-10:30", "10:30-11:30", "11:30-12:30", "12:30-1:00", "1:00-2:00",
              "2:00-3:00"]


def get_lab_slots(day, block):
    slot1 = 2 * block + 1
    slot2 = 2 * block + 2
    return [(day, slot1), (day, slot2)]


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        dept_idx = int(request.form['department']) - 1
        sem = int(request.form['semester'])

        # Extract timetable for selected dept and semester
        classes = []
        for day, slot in timetable_data['common_subjects'][str(sem)]:
            classes.append(((day, slot), "Common Sub"))
        for i in range(1, 5):  # NUM_SPECIFIC_SUBJECTS + 1
            key = f"({dept_idx}, {sem}, {i})"
            for day, slot in timetable_data['specific_subjects'][key]:
                classes.append(((day, slot), f"Sub {i}"))
        key = f"({dept_idx}, {sem})"
        day, block = timetable_data['common_labs'][key]
        for ts in get_lab_slots(day, block):
            classes.append((ts, "Common Lab"))
        for j in range(1, 3):  # NUM_SPECIFIC_LABS + 1
            key = f"({dept_idx}, {sem}, {j})"
            day, block = timetable_data['specific_labs'][key]
            for ts in get_lab_slots(day, block):
                classes.append((ts, f"Lab {j}"))

        schedule = {}
        for (day, slot), class_name in classes:
            if (day, slot) in schedule and schedule[(day, slot)] != class_name:
                schedule[(day, slot)] = "Conflict"
            else:
                schedule[(day, slot)] = class_name

        # Prepare table data
        table_data = []
        for day in range(6):
            row = [DAYS[day]]
            for p in range(8):
                if p in [2, 5]:
                    row.append("Break")
                else:
                    slot = period_to_slot[p]
                    row.append(schedule.get((day, slot), ""))
            table_data.append(row)

        return render_template('timetable.html', depts=DEPTS, dept_idx=dept_idx, sem=sem,
                               headers=['Day'] + time_slots, table_data=table_data)

    return render_template('index.html', depts=DEPTS)


if __name__ == '__main__':
    app.run(debug=True)