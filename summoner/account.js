const router = require('express').Router();
const axios = require('axios');
const token = process.env.TOKEN;

const regions = {
    "BR1": "https://br1.api.riotgames.com",
    "EUN1": "https://eun1.api.riotgames.com",
    "EUW1": "https://euw1.api.riotgames.com",
    "JP1": "https://jp1.api.riotgames.com",
    "KR": "https://kr.api.riotgames.com",
    "LA1": "https://la1.api.riotgames.com",
    "LA2": "https://la2.api.riotgames.com",
    "NA1": "https://na1.api.riotgames.com",
    "OC1": "https://oc1.api.riotgames.com",
    "TR1": "https://tr1.api.riotgames.com",
    "RU": "https://ru.api.riotgames.com"
}

router.get('/getId/:region/:name', async (req, res) => {
    const inputRegion = req.params.region;
    const region = regions[inputRegion];
    const { name } = req.params

    if(!inputRegion || !name){
        res.status(400).json({ message: "ERROR: summoner name and region required"})
        return
    };

    if(!regions[inputRegion]){
        res.status(400).json({ message: `ERROR: invalid region ${region}`})
        return
    };

    try{
        const fetch = await axios.get(`${region}/lol/summoner/v4/summoners/by-name/${name}`, {
            headers: {
                "X-Riot-Token": token
            }
        });

        const profile = fetch.data
        res.status(200).json({ "id": profile.accountId })
    } catch(error){
        console.log(error)
    }
});

router.get('/getName/:region/:id', async (req, res) => {
    const inputRegion = req.params.region;
    const region = regions[inputRegion];
    const { id } = req.params

    if(!inputRegion || !id){
        res.status(400).json({ message: "ERROR: summoner id and region required"})
        return
    };

    if(!regions[inputRegion]){
        res.status(400).json({ message: `ERROR: invalid region ${region}`})
        return
    };

    try{
        const fetch = await axios.get(`${region}/lol/summoner/v4/summoners/by-account/${id}`, {
            headers: {
                "X-Riot-Token": token
            }
        });

        const profile = fetch.data
        res.status(200).send({ "name": profile.name })
    } catch(error){
        console.log(error)
    }
});

module.exports = router;