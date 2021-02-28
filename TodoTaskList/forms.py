from django import forms

class TodoListNameForm(forms.Form):
    ListTitle = forms.CharField(label="List Title",help_text='eg. Daily Routine')

    


