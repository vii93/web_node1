$(function(){
  if(document.getElementById("editor"))
    load_editor()

});

function load_editor() {
  CKEDITOR.replace(document.querySelector('#editor'),{height: '600px'})
  
}

function add_new(tb,field_id) {
  $.ajax({
    type: 'POST',
    url: '/admin/add_new/'+tb+'/'+field_id,
    data: {},
    success: function(resultData) {
        location.reload()
    }
  });
}


function update_field(obj,tb,id) {
  if(!id)
   id = $("input[name=field_id]").val();
  
  var val = String($(obj).val());  
  if($(obj).attr("name") == "long_desc") {
    val =CKEDITOR.instances.editor.getData();
  }
  if($(obj).attr("name") == "active"){
    val = Number($(obj).is(":checked"))
  }
  if(!val) val = null;
  $.ajax({
    type: 'POST',
    url: '/admin/update_prod/'+$(obj).attr("name")+'/'+encodeURIComponent(val)+'/'+id+'/'+tb,
    success: function(res_data) {
      if(res_data.status) {
        $(obj).css("background","lightgreen")
        setTimeout(function(){ 
          $(obj).css("background","none")
        }, 1000);
        
      } else {
        $(obj).css("background","red")
        $(obj).val(obj.defaultValue);
        setTimeout(function(){ 
          $(obj).css("background","none")
        }, 1000);
      }
    }
  });
}

function submit_db_change() {
  var val = $("#db_update").val();
  $.ajax({
    type: 'POST',
    url: '/admin/update_db/'+val,
    success: function(res_data) {
      if(res_data.status)
        $("#result").val("Success!");
      else $("#result").val("False!");
    }
  });
}
