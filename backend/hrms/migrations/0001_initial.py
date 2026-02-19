from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('employee_id', models.CharField(max_length=50, unique=True)),
                ('full_name', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('department', models.CharField(max_length=120)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={'ordering': ['full_name']},
        ),
        migrations.CreateModel(
            name='Attendance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('status', models.CharField(choices=[('Present', 'Present'), ('Absent', 'Absent')], max_length=10)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('employee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='attendance_records', to='hrms.employee')),
            ],
            options={'ordering': ['-date', 'employee__full_name']},
        ),
        migrations.AddConstraint(
            model_name='attendance',
            constraint=models.UniqueConstraint(fields=('employee', 'date'), name='unique_employee_attendance_date'),
        ),
    ]
