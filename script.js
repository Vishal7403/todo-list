let btnadd=$('#btnadd')
let btnreset=$('#btnreset')
let inpnewtask=$('#inpnewtask')
let ultask=$('#ultask')
let btncleanup=$('#btncleanup')
let btnsort=$('#btnsort')

function additem()
{
    let listitem=$('<li>',{
        'class' :'list-group-item',
        'text' : inpnewtask.val()
    })
    listitem.click(()=>{
        listitem.toggleClass('done')
    })
    ultask.append(listitem)
    inpnewtask.val('')
    toggleinputbuttons()
}
inpnewtask.keypress((e)=>{
    // e.which gives the key number and key number for enter is 13
    if(e.which==13) additem()
})
btnadd.click(additem)

btnreset.click(() =>{
    inpnewtask.val('')
    toggleinputbuttons()
})
function cleardone()
{
    $('#ultask .done').remove()
    toggleinputbuttons()
}
btncleanup.click(cleardone)
btnsort.click(()=>{
    $('#ultask .done').appendTo(ultask)
})

function toggleinputbuttons()
{

        btnreset.prop('disabled',inpnewtask.val()=='')
        btnadd.prop('disabled',inpnewtask.val()=='')
        btnsort.prop('disabled',ultask.children().length<1)
        btncleanup.prop('disabled',ultask.children().length<1)
}
inpnewtask.on('input',toggleinputbuttons)