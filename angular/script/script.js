
function add_new() {
  $.ajax({
    type: 'POST',
    url: '/admin/add_new',
    data: {},
    success: function(resultData) {
        location.reload()
    }
  });
}

function update_field(obj) {
  var prod_id = $("#prod_id").val();
  var val = $(obj).val();
  if($(obj).attr("name") == "active"){
    val = Number($(obj).is(":checked"))
  }
  $.ajax({
    type: 'POST',
    url: '/admin/update_prod/'+$(obj).attr("name")+'/'+val+'/'+prod_id,
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
        $("#result").val(JSON.parse(res_data.msg));
      else $("#result").val("False!");
    }
  });
}