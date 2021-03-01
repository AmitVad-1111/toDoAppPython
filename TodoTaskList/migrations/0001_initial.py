# Generated by Django 3.1.2 on 2021-02-14 07:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='todotask',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('listName', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='todoItems',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('taskName', models.CharField(max_length=200)),
                ('priorty', models.CharField(default=0, max_length=1)),
                ('makeas', models.CharField(default='P', max_length=1)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('updated_date', models.DateTimeField(auto_now=True)),
                ('listName', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='TodoTaskList.todotask')),
            ],
        ),
    ]
