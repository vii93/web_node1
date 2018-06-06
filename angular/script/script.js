
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