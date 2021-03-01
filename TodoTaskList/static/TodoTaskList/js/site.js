var mcont = $("#mainContent");
var path = document.location.origin
var alistItem = null
var allList = null
var loadingTargetEl = null
$(function(){
    
    
    mcont.on("click","#creatbtn",function(){
        
        context = {
            "csrfmiddlewaretoken": getCSRF()
        }
        loadingTargetEl = $(this);
        showSpiner();
        loadViews('getL',c);            
        
    });

    mcont.on('click',".listTitl",function(){           
        c = {
            "csrfmiddlewaretoken": getCSRF(),
            "d":$(this).find(".listname").text()
        }        
        loadViews('viewL',c);            
    });


    mcont.on('click',".removeTask",function(){        
        rmvTask($(this).prev().text());
    });

    mcont.on('click',"#task_name",function(){
        $(this).next().next().css("visibility","visible");
    });
    mcont.on('click',".boxclose",function(){
        $(this).parent().css("visibility","hidden");
    });

    mcont.on('click',"#addNewTask",function(){
        addNewTask();
    });

    mcont.on('click','#showlist',function(){
        loadingTargetEl = $(this);
        showSpiner();
        loadViews("allL");
    });

    mcont.on('click','#rmvlist',function(){
        
        if(confirm("You want to remove this list?")){
            var lid = null
            for(i in allList){
                if(i == $(this).prev().text()){
                    lid = allList[i];
                }
            }  
            
            if(lid != null){
                c = {
                    "csrfmiddlewaretoken": getCSRF(),
                    "d":lid
                }
                loadViews("rmvlist",c);
            }

        }      
        
        
    });

    // mcont.on('click',".prorityBox span",function(){
    //     if($(this).text() == "high"){
    //         $(this).parent().prev().val(1);
    //     }else{
    //         $(this).parent().prev().val(0);
    //     }
    // });

    mcont.on('click','input[name="comp[]"]',function(){        
             
        if($(this).is(":checked")){               
            c = {
                "csrfmiddlewaretoken": getCSRF(),
                'i': getItemId($(this).val())
            }            
            loadViews("editI",c);            
        }else{            
            c = {
                "csrfmiddlewaretoken": getCSRF(),
                'i': getItemId($(this).val()),
                'r': 0
            }
            loadViews("editI",c);            
        }
    });
});

$(document).ready(function(){        
    $(".mainVLoderBox").html('<div class="loader loaderShow"></div>');        
    loadViews("");        
});
function showSpiner(){
    $(loadingTargetEl).next('.loader').removeClass('loaderHide').addClass('loaderShow');
}
function hideSpiner(){
    $(loadingTargetEl).next('.loader').removeClass('loaderShow').addClass('loaderHide');
}

function getItemId(txt){
    var id = null;        
    for (i=0; i < alistItem.length ;i++){
        if (alistItem[i]['taskn'] == txt){            
            id = alistItem[i]['id'];
        }
    }
    return id;
}

function getCSRF(){
    return $('input[name="csrfmiddlewaretoken"]').val();        
}
function stopSubmit(){
    var dtitle = $("input[name='ListTitle']").val();
    c = {'titl':dtitle,"csrfmiddlewaretoken": getCSRF()}
    $.post(path + '/cretL',c,function(d,s){
        if(s == "success"){
            mcont.html(d);
        }
    });
    return false;
}

function addNewTask(){ 
    var continer = mcont.find(".listItem");
    var tbox = mcont.find("#task_name");
    var tboxp = mcont.find("#priority");
    if (tbox.val() != undefined){
        c = {
            "csrfmiddlewaretoken": getCSRF(),
            "task" : tbox.val(),
            "priority":tboxp.val()
        }
        
        $.post(path + "/additem",c,function(d,s){
            if(s == "success"){
                showList();
            }
        });
    }else{
        
        elment  = '<input type="text" name="taskname" id="task_name"/>';
        elment += '<input type="hidden" name="priority" id="priority" value="0"/>';
        // elment += '<div class="prorityBox">';
        // elment += '<span>normal</span>';
        // elment += '<span>high</span>';
        // elment += '<span class="boxclose">X</span>';
        // elment += '</div>';
        continer.append(elment);        

    }
    

}

function showList(){    
    var continer = mcont.find(".listItem");
    continer.html('');
    $.post(path + "/getAllitem",c,function(d,s){
        c = {"csrfmiddlewaretoken": getCSRF()}
        if(s == "success"){            
            var x = $.parseJSON(d);                        
            alistItem = x;
            elm = ''
            for(i=0;i<x.length;i++){
                var klass = '';
                var chk = '';
                if(x[i]['markeas']){
                    klass = "class='iComplete'";
                    chk = "checked=true";
                }
                elm += '<div class="item">';
                elm += '<input type="checkbox" name="comp[]" '+ chk +' value="'+ x[i]['taskn'] +'">';
                elm += '<span '+ klass +'>'+ x[i]['taskn'] +'</span>';
                elm += '<span class="removeTask">X</span>';
                elm += '</div>';
            }            
            continer.append(elm);
        }
    });
}
function rmvTask(el){
    i = getItemId(el);    
    c = {
        "csrfmiddlewaretoken": getCSRF(),
        "task" : i,        
    }
    loadViews('rmvtask',c)
}

function loadViews(n,d=null){
    var view = null;
    if(n == null || n == ''){
        // view = "allL";
        view = "curr";
    }
    else{
        view = n
    }
    if(d == null){
        c = {"csrfmiddlewaretoken": getCSRF()}        
    }else{
        c = d
    }
    $.post(path + '/'+ view,c,function(d,s){
        if(s == "success"){                         
            switch(view){
                 case "curr":
                            $(".mainVLoderBox").html('');           
                            b = $.parseJSON(d);
                             if(b['currd'] != undefined){
                                  c['d'] = b['currd']
                             }
                             loadViews(b['currv'],c)                                               
                             break;   
                            
                // ------------------------------------------------------
                case "viewL":                            
                    if(s == "success"){mcont.html(d);showList();}                        
                    break;
                // ------------------------------------------------------
                case "getL":
                    if (s == 'success'){ mcont.html(d);}
                    else{alert('Something goes wrong');}
                    break;
                // ------------------------------------------------------
                case "gallL": 
                    var dx = $.parseJSON(d);                        
                    allList = dx;                    
                    break;
                // ------------------------------------------------------
                case "editI":showList();break;
                // ------------------------------------------------------
                case "rmvtask":showList();break;
                // ------------------------------------------------------
                case "rmvlist":loadViews(""); break;
                // ------------------------------------------------------
                default:              
                    $(".mainVLoderBox").html('');
                    mcont.html(d);
                    loadViews("gallL");                    
                    break;
            }

        }
    });

}