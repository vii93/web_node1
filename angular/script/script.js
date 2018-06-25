$(document).ready(function(){
  console.log(document.getElementById("editor1"))
  if(document.getElementById("editor1"))
    CKEDITOR.replace(document.querySelector('#editor1'))
});

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
  $.ajax({
    type: 'POST',
    url: '/admin/update_prod/'+$(obj).attr("name")+'/'+encodeURIComponent(val)+'/'+id+'/'+tb,
    success: function(res_data) {
      if(res_data.status)
        alert("Success!")
      else alert("False!")
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