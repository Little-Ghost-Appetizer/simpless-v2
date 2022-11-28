import type { NextApiRequest, NextApiResponse } from "next";

export const mockUrl = "https://6377ed020992902a2513e93a.mockapi.io/word";
export const localUrl = "http://127.0.0.1:5000/api/simplesssearch";
export const simplessUrl = "http://223.130.134.246:5000/api/simplesssearch?";

type SearchResult = {
	keywords?: string[];
	users?: { profile_image_url: string; user_account: string }[];
	posts?: object[];
	finished: boolean;
	error?: any;
};

const shirt_keywords = ["hoodies","#design","#shopmycloset","#cool","#etsy","#amc","#hot","#worldcup2022","#fashion","#shirts","#funnyshirts","shirt","selling","check","size","one","sign","apply","term","sleeve","money","xl","men",];
const shirt_users = [{user_account: "Drawing23147245",profile_image_url:	"https://pbs.twimg.com/profile_images/1563385719174729730/XYZ0snxX_normal.jpg",},{user_account: "ickonic",profile_image_url:	"https://pbs.twimg.com/profile_images/1591415409768632325/zmMutx9z_normal.jpg",},{user_account: "Med7lil",profile_image_url:	"https://pbs.twimg.com/profile_images/1593639115991523331/RslUQaCd_normal.jpg",},{user_account: "BioessentApp",profile_image_url:	"https://pbs.twimg.com/profile_images/1592203714659590145/YWpqz_zu_normal.jpg",},{user_account: "UtmostSport",profile_image_url:	"https://pbs.twimg.com/profile_images/1526505701283344384/mhhXYYc3_normal.jpg",}]
const shirt_posts = [{url: "https://twitter.com/1383045502980227076/status/1589434678226059264",user_account: "Drawing23147245",profile_image_url:"https://pbs.twimg.com/profile_images/1563385719174729730/XYZ0snxX_normal.jpg",content:"Designing and selling cute and funny merch (shirts,stickers,hodies,mugs...) and other.\n\n#Thanksgiving2022 #Artists #November2022 #redbubble #redbubbleshop #shirts #hoodies #Stickers #holidayseason #graphicdesigners #SmallBusiness #art \n\nHere is my shop:\nhttps://t.co/GsiotZRssN",},{url: "https://twitter.com/1314515316869922816/status/1593212615509016576",user_account: "ickonic",profile_image_url:"https://pbs.twimg.com/profile_images/1591415409768632325/zmMutx9z_normal.jpg",content:"Did somebody say Ickonic Merch!\n\nWe are now selling Ickonic branded merchandise, head on over to https://t.co/IniHTTVOd3 to browse all of the merchandise we have to offer.\n\n#ickonic #branded #merchandise #clothing #hats #shirts #hoodies #davidicke https://t.co/RRlRP8SdZJ",},{url: "https://twitter.com/1590098571617001477/status/1592257927964164096",user_account: "Med7lil",profile_image_url:"https://pbs.twimg.com/profile_images/1593639115991523331/RslUQaCd_normal.jpg",content:"Sun🌞#shirt  T_shirt print on demand  best selling https://t.co/LuTYEOtxfn",},{url: "https://twitter.com/1589735305317335041/status/1596239186285432832",user_account: "BioessentApp",profile_image_url:"https://pbs.twimg.com/profile_images/1592203714659590145/YWpqz_zu_normal.jpg",content:"Bioessent has a new website at https://t.co/QzXs4cXnhM and a new mission to help indie artists put their artwork onto apparel and sell it! #selling #business #shoppify #etsy #shirts #design #art #Artists #ClothingAccessories #SmallBusinesses https://t.co/tNVjlpIj0V",},{url: "https://twitter.com/1526505605753901056/status/1592170503917260807",user_account: "UtmostSport",profile_image_url:"https://pbs.twimg.com/profile_images/1526505701283344384/mhhXYYc3_normal.jpg",content:"Up your game. Find comfort in every thread. 𝗦𝗵𝗼𝗽 𝗼𝗻𝗹𝗶𝗻𝗲: https://t.co/SOFtEyCfOm Follow @UtmostSport to know more about our services, best-selling products, promo offers, new arrivals, and more. #tshirts #utmostsport #shirt #shirtdesign #shirtsformen https://t.co/ABOUJ1AFgK",},];

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<SearchResult>
) {
	try {
		// console.log(`searchTweet called ${req.query.search_keyword} ${req.query.continue}`)
		const search_keyword = req.query.search_keyword as string;
		const searchParams = new URLSearchParams({
			continue: req.query.continue as string,
			search_keyword: search_keyword,
			upper_round: "3",
			upper_count: "1",
			num_tags: "1",
		});

		if(search_keyword === "selling shirts") {
			res.status(200).send({
				keywords: shirt_keywords,
				users: shirt_users,
				posts: shirt_posts,
				finished: true,
			});
			return
		}
		// if(search_keyword && Array.isArray(search_keyword)){
		// 	search_keyword.forEach((e) => {
		// 		searchParams.append("search_keyword", e);
		// 	});
		// }

		const data = await fetch(simplessUrl + searchParams, {
			method: "GET",
			headers: {
				"content-type": "application/json; version=2",
			},
		});
		const data_json = await data.json();
		res.status(200).send(data_json);
	} catch (err) {
		res.status(500).send({ error: err, finished: false });
	}
}
