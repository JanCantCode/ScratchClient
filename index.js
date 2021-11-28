
const request = require("request")
const json = require("json")
const ws = require("ws")

module.exports = class Session {
    constructor(username, password) {
        this.username = username
        this.password = password
        this.thing = ''

    }

    scratchInteraction(interaction, value = '', value2 = '', value3 = '') {
        request.post({
            method: 'POST',
            url: 'https://scratch.mit.edu/login/',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': 'a',
                'Referer': 'https://scratch.mit.edu',
                'Cookie': 'scratchcsrftoken=a;'
            },
            body: JSON.stringify({"username": this.username, "password": this.password})
        }, (error, response, body) => {
            this.test = JSON.parse(response.body)
            if (this.test[0].success == 0) {
                throw("Username or Password is invalid!")
            }
            this.thing = (response.caseless.dict["set-cookie"])
            this.thing = this.thing[0].split(";").find(e=>e.startsWith("scratchsessionsid=")).split("=")[1]
            this.crsftoken = (response.caseless.dict["set-cookie"]) // cookie header wird ausgewählt
            this.crsftoken =  this.crsftoken[1].split(";").find(e=>e.startsWith("scratchcsrftoken=")).split("=")[1]
            this.usertoken = JSON.parse(body)[0].token
            
            this.wrongInteraction = true

            if (interaction == 'love_project') {
                if (value == '') {
                    throw("You did not give any project ID to love!")
                } else {
                    this.love_project(value)
                }
                this.wrongInteraction = false
            }

            if (interaction == 'fav_project') {
                if (value == '') {
                    throw("You did not give any project ID to favourite!")
                } else {
                    this.fav_project(value)
                }
                this.wrongInteraction = false
            }

            if (interaction == 'follow_user') {
                if (value == '') {
                    throw("You did not give a user to follow")
                } else {
                    this.follow_user(value)
                }
                this.wrongInteraction = false
            }

            if (interaction == 'project_comment') {
                if (value == '') {
                    throw("You did not give a project to comment on!")
                } else {
                if (value2 == '') {
                    throw("You did not give a comment to send")
                } else {
                    this.project_comment(value, value2)
                }
                }
                this.wrongInteraction = false
            }

            if (interaction == 'unfav_project') {
                if (value == '') {
                    throw("You did not give a project ID to unfavourite!")
                } else {
                    this.unfav_project(value)
                }
                this.wrongInteraction = false
            }

            if (interaction == 'unlove_project') {
                if (value == '') {
                    throw("You did not give a project ID to unlove")
                } else {
                    this.unlove_project(value)
                }
                this.wrongInteraction = false
            }

            if (interaction == 'unfollow_user') {
                if (value == '') {
                    throw("You did not give a username to unfollow!")
                } else {
                    this.unfollow_user(value)
                }
                this.wrongInteraction = false
            }

            if (interaction == 'studio_comment') {
                if (value == '') {
                    throw("You did not give a Studio do comment in!")
                } else {
                    if (value2 == '') {
                        throw("You did not give anything to comment!")
                    } else {
                        this.studio_comment(value, value2)
                    }
                }
                this.wrongInteraction = false
            }

            if (interaction == 'unfollow_studio') {
                if (value == '') {
                    throw("You did not give a Studio to unfollow!")
                } else {
                    this.unfollow_studio(value)
                }
                this.wrongInteraction = false
            }

            if (interaction == 'studio_invite') {
                if (value == '') {
                    throw("You did not give a Studio to invite somebody in!")
                } else {
                    if (value2 == '') {
                        throw("You did not give a user to invite into the studio!")
                    } else {
                        this.studio_invite(value, value2)
                    }
                }
                this.wrongInteraction = false
            }

            if (interaction == 'profile_comment') {
                if (value == '') {
                    throw("You did not give a profile to comment on!")
                } else {
                    if (value2 == '') {
                        throw("You did not give a comment to send!")
                    } else {
                        this.user_comment(value, value2)
                    }
                }
                this.wrongInteraction = false
            }
            if (this.wrongInteraction == true) {
                throw("The given interaction does not exist! (check <link> for more information about existing Interactions!)")
            }

    })
    }

    love_project(projectid) {
        this.projectid = projectid
        this.love_cookie = 'scratchlanguage=en; scratchsessionsid=' + this.thing + '; scratchcsrftoken=' + this.crsftoken + ";" // der cookie, enthält sessionid und crsftoken
        this.love_link = "https://api.scratch.mit.edu/proxy/projects/" + projectid + "/loves/user/" + this.username
        request.post({
            method: 'POST',
            url: this.link,
            headers: {
                'cookie': this.cookie,
                'x-csrftoken': this.crsftoken,
                'referer': 'https://scratch.mit.edu/',
                'x-requested-with': 'XMLHttpRequest',
                'x-token': this.usertoken
            }
        }, (error, response, body) => {
        }
        )
    }

    unlove_project(project) {
        this.project = project
        this.unlove_cookie = 'scratchlanguage=en; scratchsessionsid=' + this.thing + '; scratchcsrftoken=' + this.crsftoken + ";"
        this.unlove_link = "https://api.scratch.mit.edu/proxy/projects/" + project + "/loves/user/" + this.username
        request.delete({
            method: 'DELETE',
            url: this.unlove_link,
            headers: {
                'cookie': this.unlove_cookie,
                'x-csrftoken': this.crsftoken,
                'referer': 'https://scratch.mit.edu/',
                'x-requested-with': 'XMLHttpRequest',
                'x-token': this.usertoken
            }
        }, (error, response, body) => {
        }
        )
        
    }

    follow_user(user) {
        this.follow_cookie = this.cookie = 'scratchlanguage=en; scratchsessionsid=' + this.thing + '; scratchcsrftoken=' + this.crsftoken + ";"
        this.follow_link = 'https://scratch.mit.edu/site-api/users/followers/' + user + '/add/?usernames=' + this.username
        request.put({
            method: 'PUT',
            url: this.follow_link,
            headers: {
                'cookie': this.cookie,
                "x-csrftoken": this.crsftoken,
                'referer': 'https://scratch.mit.edu',
                'x-requested-with': 'XMLHttpRequest',
                'x-token': this.usertoken
            }
            
        }, (error, response, body) => {
        })
    }

    unfollow_user(user) {
        this.unfollow_cookie = this.cookie = 'scratchlanguage=en; scratchsessionsid=' + this.thing + '; scratchcsrftoken=' + this.crsftoken + ";"
        this.unfollow_link = 'https://scratch.mit.edu/site-api/users/followers/' + user + '/remove/?usernames=' + this.username
        request.put({
            method: 'PUT',
            url: this.unfollow_link,
            headers: {
                'cookie': this.unfollow_cookie,
                "x-csrftoken": this.crsftoken,
                'referer': 'https://scratch.mit.edu',
                'x-requested-with': 'XMLHttpRequest',
                'x-token': this.usertoken
            }
            
        }, (error, response, body) => {
        })
    }

    follow_studio(studio) {
        this.follow_studio_link = 'https://scratch.mit.edu/site-api/users/bookmarkers/' + studio + '/add/?usernames=' + this.username
        this.follow_studio_cookie = this.cookie = 'scratchlanguage=en; scratchsessionsid=' + this.thing + '; scratchcsrftoken=' + this.crsftoken + ";"
        request.put({
            method: 'PUT',
            url: this.follow_studio_link,
            headers: {
                'cookie': this.unfollow_studio_cookie,
                "x-csrftoken": this.crsftoken,
                'referer': 'https://scratch.mit.edu',
                'x-requested-with': 'XMLHttpRequest',
                'x-token': this.usertoken
            }
            
        })
    }

    unfollow_studio(studio) {
        this.unfollow_studio_link = 'https://scratch.mit.edu/site-api/users/bookmarkers/' + studio + '/remove/?usernames=' + this.username
        this.unfollow_studio_cookie = this.cookie = 'scratchlanguage=en; scratchsessionsid=' + this.thing + '; scratchcsrftoken=' + this.crsftoken + ";"
        request.put({
            method: 'PUT',
            url: this.unfollow_studio_link,
            headers: {
                'cookie': this.unfollow_studio_cookie,
                "x-csrftoken": this.crsftoken,
                'referer': 'https://scratch.mit.edu',
                'x-requested-with': 'XMLHttpRequest',
                'x-token': this.usertoken
                }
                
            })
        }

    fav_project(project) {
        this.fav_cookie = 'scratchlanguage=en; scratchsessionsid=' + this.thing + '; scratchcsrftoken=' + this.crsftoken + ";" 
        this.fav_link = "https://api.scratch.mit.edu/proxy/projects/" + project + "/favorites/user/" + this.username
        request.post({
            method: 'POST',
            url: this.fav_link,
            headers: {
                'cookie': this.fav_cookie,
                'x-csrftoken': this.crsftoken,
                'referer': 'https://scratch.mit.edu/',
                'x-requested-with': 'XMLHttpRequest',
                'x-token': this.usertoken
            }
        }, (error, response, body) => {
        }
        )
    }

    unfav_project(project) {
        this.fav_cookie = 'scratchlanguage=en; scratchsessionsid=' + this.thing + '; scratchcsrftoken=' + this.crsftoken + ";" 
        this.fav_link = "https://api.scratch.mit.edu/proxy/projects/" + project + "/favorites/user/" + this.username
        request.delete({
            method: 'DELETE',
            url: this.fav_link,
            headers: {
                'cookie': this.fav_cookie,
                'x-csrftoken': this.crsftoken,
                'referer': 'https://scratch.mit.edu/',
                'x-requested-with': 'XMLHttpRequest',
                'x-token': this.usertoken
            }
        }, (error, response, body) => {
        }
        )
    }

    project_comment(project, text) {
        this.project_comment_link = "https://api.scratch.mit.edu/proxy/comments/project/" + project
        this.project_comment_cookie = 'scratchlanguage=en; scratchsessionsid=' + this.thing + '; scratchcsrftoken=' + this.crsftoken + ";"
        request.post({
            method: 'POST',
            json: true, 
            url: this.project_comment_link,
            headers: {
                'cookie': this.project_comment_cookie,
                'x-csrftoken': this.crsftoken,
                'referer': 'https://scratch.mit.edu/',
                'x-requested-with': 'XMLHttpRequest',
                'x-token': this.usertoken
            },
            body: {
                "content": text,
                "parent_id": "",
                "commentee_id": ""
            }
        })
    }

    studio_comment(studio, text) {
        this.studio_comment_link = "https://api.scratch.mit.edu/proxy/comments/studio/" + studio
        this.studio_comment_cookie = 'scratchlanguage=en; scratchsessionsid=' + this.thing + '; scratchcsrftoken=' + this.crsftoken + ";"
        request.post({
            method: 'POST',
            json: true, 
            url: this.studio_comment_link,
            headers: {
                'cookie': this.studio_comment_cookie,
                'x-csrftoken': this.crsftoken,
                'referer': 'https://scratch.mit.edu/',
                'x-requested-with': 'XMLHttpRequest',
                'x-token': this.usertoken
            },
            body: {
                "content": text,
                "parent_id": "",
                "commentee_id": ""
            }
        })
    }

    user_comment(user, text) {
        this.user_comment_link = 'https://scratch.mit.edu/site-api/comments/user/' + user + '/add/'
        this.user_comment_cookie = 'scratchlanguage=en; scratchsessionsid=' + this.thing + '; scratchcsrftoken=' + this.crsftoken + ";"
        request.post({
            method: 'POST',
            json: true,
            url: this.user_comment_link,
            headers: {
                'cookie': this.user_comment_cookie,
                'x-csrftoken': this.crsftoken,
                'x-requested-with': 'XMLHttpRequest',
                'x-token': this.usertoken,
                'referer': 'https://scratch.mit.edu'
            },
            body: {
                "content": text,
                "parent_id": "",
                "commentee_id": ""
            }
        }, (error, response, body) => {
        })
    }

    studio_invite(studio, username) {
        this.invite_link = 'https://scratch.mit.edu/site-api/users/curators-in/' + studio + '/invite_curator/?usernames=' + username
        this.studio_invite_cookie = 'scratchlanguage=en; scratchsessionsid=' + this.thing + '; scratchcsrftoken=' + this.crsftoken + ";"
        request.put({
            method: 'PUT',
            url: this.invite_link,
            headers: {
                'cookie': this.studio_comment_cookie,
                'x-csrftoken': this.crsftoken,
                'referer': 'https://scratch.mit.edu/',
                'x-requested-with': 'XMLHttpRequest',
                'x-token': this.usertoken
            }

        })
    }

    share_project(project) {
        this.share_project_link = 'https://api.scratch.mit.edu/proxy/projects/' + project + '/share'
        this.share_project_cookie = 'scratchlanguage=en; scratchsessionsid=' + this.thing + '; scratchcsrftoken=' + this.crsftoken + ";"
        request.put({
            method: 'PUT',
            url: this.share_project_link,
            headers: {
                'cookie': this.share_project_cookie,
                'x-csrftoken': this.crsftoken,
                'referer': 'https://scratch.mit.edu/',
                'x-requested-with': 'XMLHttpRequest',
                'x-token': this.usertoken
            }
        })

    }

    post_view(project, project_owner) {
        this.post_view_link = 'https://api.scratch.mit.edu/users/' + project_owner + '/projects/' + project + '/views'
        request.post({
            method: 'POST',
            url: this.post_view_link,
            headers: {
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36',
                "accept": "*/*",
                "accept-language": "en",
                "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
                "sec-ch-ua-mobile": "?0",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "x-csrftoken": "a"
            }
        })
    }

    cloud({username, password}, {method, project, variable, value}) {
        if (typeof value !== "string") {
            throw("Cloud variables can only be set to numbers!")
        }
        request.post({
            method: 'POST',
            url: 'https://scratch.mit.edu/login/',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': 'a',
                'Referer': 'https://scratch.mit.edu',
                'Cookie': 'scratchcsrftoken=a;'
            },
            body: JSON.stringify({"username": username, "password": password})
        }, (error, response, body) => {
            
            this.thing = (response.caseless.dict["set-cookie"])
            this.thing = this.thing[0].split(";").find(e=>e.startsWith("scratchsessionsid=")).split("=")[1]
            this.crsftoken = (response.caseless.dict["set-cookie"])
            this.crsftoken =  this.crsftoken[1].split(";").find(e=>e.startsWith("scratchcsrftoken=")).split("=")[1]
            this.usertoken = JSON.parse(body)[0].token
    
            const websocket = new ws("wss://clouddata.scratch.mit.edu/", [], {
            headers: {
                cookie: "scratchsessionsid=" + this.thing + ";",
                origin: "https://scratch.mit.edu"
            }
        })
        websocket.addEventListener("open", () => {
            websocket.send(`${JSON.stringify({name: "handshake", "user": username, "project_id": project})}\n`)
            websocket.send((`${JSON.stringify({"method": method,"user": username ,"project_id":project,"name":"☁ " + variable,"value":String(value)}
            )}\n`))
        })
        })
    
    }
}