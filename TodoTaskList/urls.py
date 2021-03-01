from django.urls import path
from TodoTaskList.views import *
urlpatterns=[    
    path("",showMainView,name="Main"),
    path("curr",returnCurrentView,name="current_view"),
    path("allL",getAllList,name="show_all_list"),
    path("getL",getNewListForm,name="list_form"),
    path("cretL",creatNewList,name="creat_list"),
    path("viewL",viewList,name="view_list"),
    # path("getitem",getTask,name="gettask"),
    path("additem",addTask,name="addtask"),
    path("getAllitem",getAllTask,name="getAlltask"),
    path("editI",editItem,name="edti_item"),
    path("rmvtask",rmvItem,name="rmv_item"),
    path("gallL",getAllListData,name="getList_all"),
    path("rmvlist",removeList,name="rmvList"),
    
    
    
    
]