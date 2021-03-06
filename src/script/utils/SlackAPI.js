class SlackAPI {
  constructor(token) {
    this.token = token;
  }

  checkTocken(token) {
    return fetch(`https://slack.com/api/auth.test?token=${token}&pretty=1`)
      .then(response => response.json())
      .then(data => {
        if (data.ok == false) {
          localStorage.removeItem("token");
          localStorage.removeItem("channel");
          localStorage.removeItem("user");
          location.hash = "";
          return Promise.reject();
        } else {
          this.token = token;
        }
      });
  }

  readRoomMessages(room, token) {
    token = token || this.token;
    let promise = fetch(
      `https://slack.com/api/im.history?token=${token}&channel=${room}&pretty=1`
    ).then(response => response.json());

    promise.then(() => localStorage.setItem("channel", room));

    return promise;
  }
  userList(token) {
    return fetch(
      `https://slack.com/api/users.list?token=${token}&pretty=1`
    ).then(response => response.json());
  }
  oAuthAccess() {
    let code = location.href;
    code = code.split("?");
    code = code.splice(1, 1);
    code = String(code);
    code = code.slice(5).split("&")[0];
    return fetch(
      `https://slack.com/api/oauth.access?client_id=217857254422.216894611363&client_secret=73b8f39e3b53e9635094ae7ce4d1bf69&code=${code}`
    ).then(response => response.json());
  }
  chatPostMsg(token, channel, message, user) {
    return fetch(
      `https://slack.com/api/chat.postMessage?token=${token}&channel=${channel}&text=${message}&as_user=${user}&username=${user}&pretty=1`
    ).then((document.querySelector(".sendMessage").value = ""));
  }
  userInfo(token, user) {
    return fetch(
      `https://slack.com/api/users.info?token=${token}&user=${user}&pretty=1`
    ).then(response => response.json());
  }
  channelsHistory(token, channel) {
    return fetch(
      `https://slack.com/api/channels.history?token=${token}&channel=${channel}&pretty=1`
    ).then(response => response.json());
  }
  channelList(token) {
    return fetch(
      `https://slack.com/api/channels.list?token=${token}&pretty=1`
    ).then(response => response.json());
  }
  rtmConnect(token, ur) {
    return fetch(
      `https://slack.com/api/rtm.connect?token=${token}&pretty=1`
    ).then(response => response.json());
  }
  channelArchive(token, channel) {
    return fetch(
      `https://slack.com/api/channels.archive?token=${token}&channel=${channel}&pretty=1`
    );
  }
  channelLeave(token, channel) {
    return fetch(
      `https://slack.com/api/channels.leave?token=${token}&channel=${channel}&pretty=1`
    );
  }
  channelJoin(token, channelName) {
    return fetch(
      `https://slack.com/api/channels.join?token=${token}&name=${channelName}&pretty=1`
    );
  }
  channelCreate(token, nameChannel) {
    return fetch(
      `https://slack.com/api/channels.create?token=${token}&name=${nameChannel}&pretty=1`
    );
  }
  imList(token) {
    return fetch(
      `https://slack.com/api/im.list?token=${token}&pretty=1`
    ).then(response => response.json());
  }
  imHistory(token, room) {
    return fetch(
      `https://slack.com/api/im.history?token=${token}&channel=${room}&pretty=1`
    ).then(response => response.json());
  }
}

export default SlackAPI;
