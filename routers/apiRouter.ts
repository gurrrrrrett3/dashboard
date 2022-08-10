import { Router } from 'express';
import fetch from "node-fetch"
const router = Router();

router.post("/setColor", (req, res) => {
    const { color } = req.body;
    res.sendStatus(200);

    fetch("http://10.1.1.4:3333/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            hex: color
        })
    })
    
})

export default router;