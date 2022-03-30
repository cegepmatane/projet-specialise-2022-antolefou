// const GUN = require('gun/gun');
// import GUN from 'gun';
const db = GUN();


// ------ BDD -----
// je crois qu'il faut faire deux instances séparé

// db.get('tchat').put({
//     messages: '-- début du tchat --',
// });

var tchat = {};

db.get('tchat').get("messages").on(v => {
    $('#tchat').val(v);
});

$("#buttonEnvoyerMsg").click(async function(){
    let messageAEnvoyer = $("input#msg").val();

    if (isLogged()) {
        await tchat.putMessage( await tchat.getNewBlock(messageAEnvoyer))
            .catch(r => console.log(r))

        $("input#msg").val("");
    }
})

tchat.putMessage = async function (message){
    db.get("tchat").get("messages").put(
        message
    )
}

tchat.getNewBlock = async function getNewBlock(ajoutMessages){
    let block = "--début du tchat-- \n " + user.is.alias + " : " + ajoutMessages;
    await db.get('tchat').once(v => {
        if (v.messages !== undefined){
            block = v.messages  + "\n " + user.is.alias + " : " + ajoutMessages;
        }

    });
    console.log("block est : "+block)
    return block
}
