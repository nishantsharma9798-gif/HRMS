from rest_framework import serializers
from .models import Attendance, Employee


class EmployeeSerializer(serializers.ModelSerializer):
    present_days = serializers.SerializerMethodField()

    class Meta:
        model = Employee
        fields = ['id', 'employee_id', 'full_name', 'email', 'department', 'created_at', 'present_days']

    def get_present_days(self, obj):
        return obj.attendance_records.filter(status=Attendance.StatusChoices.PRESENT).count()


class AttendanceSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.full_name', read_only=True)
    employee_identifier = serializers.CharField(source='employee.employee_id', read_only=True)

    class Meta:
        model = Attendance
        fields = ['id', 'employee', 'employee_name', 'employee_identifier', 'date', 'status', 'created_at']

    def validate(self, attrs):
        employee = attrs.get('employee')
        date = attrs.get('date')

        if self.instance is None and Attendance.objects.filter(employee=employee, date=date).exists():
            raise serializers.ValidationError(
                {'non_field_errors': ['Attendance for this employee on this date already exists.']}
            )

        return attrs
