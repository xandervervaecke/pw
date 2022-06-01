var push = require('web-push')
let vapidKeys = {
    publicKey: 'BBpS5tp2_TojL4KyOkyfhWFffToTw-DjdTnpkCEDy-e3FdPI4jOS8maKRTThOW2jx_s3vMTxWvrkalGxxjnrIuA',
    privateKey: 'qktT85SrfEfBb-CIOCRo4-To1DMLF7J5K-FEQbsd_BI'
}

push.setVapidDetails('mailto:test@code.co.uk', vapidKeys.publicKey, vapidKeys.privateKey)


let sub = { "endpoint": "https://wns2-db5p.notify.windows.com/w/?token=BQYAAABmwRQ%2fPQZ%2bEE9FyglB1R3AEhrZET858JXyGkRb%2bkrAG7sgxTscvM7b7wgxtazCNgsvE5DrL%2fNjpad%2fwBS8B%2b0Hf2VHVxuOebITyA7rxXqExtH05cJou2KPaXpWSVs4b2YsWpBL409J%2b0GBoMgPfatsy6HV4w5hO6l%2fzI1S6Fu86ZqGeQtPIKha0vNHYvDG0e6A9uspsb9HOgqzZ4hZVWhgy%2f2av1L2aB6OQAMa1oLOH3wg6RjMca9RV6W3BAPZE5EC63By%2bSKzJk2V15fIwaop51tmI6Amuk7h6IAhEt3yEce4%2frPe5hEkEFF9jh65Fe%2f8VVru2lWM30yJhPviVgH1", "expirationTime": null, "keys": { "p256dh": "BPEx78jReJFqTonyKNHaBkceKokNWf_TZwVqgVE4VQjuAegmH_O728HbLOw9j__DD3oTkBXnog0XtJKueFVnmhM", "auth": "_b21T5576r9G8vAqa_W5XQ" } }
push.sendNotification(sub, "test message")