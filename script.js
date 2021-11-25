//buttons declared here
let btnadd = $("#btnadd");
let btnreset = $("#btnreset");
let inpnewtask = $("#inpnewtask");
let ultask = $("#ultask");
let btncleanup = $("#btncleanup");
let btnsort = $("#btnsort");
//adding item function
function additem() {
  //HTML contents which need to be rendered are declared here
  let listitem = $("<li>", {
    class: "list-group-item mt-3 ",
    style: "border:2px solid black;",
  });
  let list_content = $("<li>", {
    class: "list-group-item",
    text: inpnewtask.val(),
  });
  let edit_icon = $(`
    <button type="button" class="btn btn-primary mt-2  edit_task" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Edit Note
      <i class="fas fa-edit"></i>
    </button>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit your Note here</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          <div class="input-group">
          <span class="input-group-text">Description</span>
          <textarea class="form-control text_area" aria-label="With textarea"  ></textarea>
          </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary update_task" data-bs-dismiss="modal">Save changes</button>
          </div>
        </div>
      </div>
    </div>`);
  let delete_icon = $(
    '<button class=" btn btn-primary delete_task mx-3 mt-2">Delete<i class="fas fa-trash-alt"></i></button>'
  );
  //appending all HTML parts to their parent component
  listitem.append(list_content);
  listitem.append(edit_icon);
  listitem.append(delete_icon);
  ultask.append(listitem);
  inpnewtask.val("");
  list_content.click(() => {
    list_content.toggleClass("done");
  });
  toggleinputbuttons();
}
//functions for performing update and delete of individual parts
$(document).on("click", ".delete_task", (e) => {
  $($(e.target).parent()).remove();
});
let element = null;
$(document).on("click", ".edit_task", (e) => {
  element = $(e.target).prev();
  $(".text_area").val(element.html());
});
$(document).on("click", ".update_task", () => {
  element.html($(".text_area").val());
});
inpnewtask.keypress((e) => {
  // e.which gives the key number and key number for enter is 13
  if (e.which == 13) additem();
});

btnadd.click(additem);

btnreset.click(() => {
  inpnewtask.val("");
  toggleinputbuttons();
});
//cleanup function
function cleardone() {
  $($("#ultask .list-group-item.mt-3").find(".list-group-item.done"))
    .parent()
    .remove();
  toggleinputbuttons();
}
btncleanup.click(cleardone);
//sorting function
btnsort.click(() => {
  $($("#ultask .list-group-item.mt-3").find(".list-group-item.done"))
    .parent()
    .appendTo(ultask);
});
//toggling buttons function
function toggleinputbuttons() {
  btnreset.prop("disabled", inpnewtask.val() == "");
  btnadd.prop("disabled", inpnewtask.val() == "");
  btnsort.prop("disabled", ultask.children().length < 1);
  btncleanup.prop("disabled", ultask.children().length < 1);
}
inpnewtask.on("input", toggleinputbuttons);
