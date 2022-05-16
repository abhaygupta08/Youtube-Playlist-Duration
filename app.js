url = window.location['href']
if (url.indexOf("/playlist?list=") != -1) {
    const toSecond = (time) => {
        const timeSplitted = time.split(":");
        if (timeSplitted.length === 3) {
            const [hours, minutes, seconds] = time.split(":")
            return (parseInt(hours) * 60 * 60) + (parseInt(minutes) * 60) + parseInt(seconds)
        } else {
            const [minutes, seconds] = time.split(":")
            return (parseInt(minutes) * 60) + parseInt(seconds)
        }
    }
    const toTimeString = (seconds) => {
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds - (hours * 3600)) / 60)
        const secondsLeft = seconds - (hours * 3600) - (minutes * 60)
        return `${String(hours).length < 2 ? '0' : ''}${hours}:${String(minutes).length < 2 ? '0' : ''}${minutes}:${String(secondsLeft).length < 2 ? '0' : ''}${secondsLeft}`
    }

    const getPlaylistDuration = () => {
        let timeInSeconds = 0;
        document.querySelectorAll('.style-scope ytd-thumbnail-overlay-time-status-renderer').forEach(f => timeInSeconds += toSecond(f.innerText))
        return toTimeString(timeInSeconds);
    }

    window.onload = () => {
        setTimeout(() => { proceed(); }, 5000);
    }
    function proceed() {

        function getDurationAndVideoCount() {

            var timeStamp = document.querySelectorAll('.style-scope ytd-thumbnail-overlay-time-status-renderer'),
                totalDurationInSeconds = 0,
                hours, minutes, seconds;
            //Runs the loop and fetches the total duration in seconds
            var numOfVideoes = timeStamp.length;
            for (var i = 0; i < numOfVideoes; i++) {
                var timeString = timeStamp[i].innerText;
                var HMS = timeString.split(':');
                if (HMS.length === 3) {
                    hours = parseInt(HMS[0]);
                    minutes = parseInt(HMS[1]);
                    seconds = parseInt(HMS[2]);
                }
                else {
                    hours = 0;
                    minutes = parseInt(HMS[0]);
                    seconds = parseInt(HMS[1]);
                }
                totalDurationInSeconds += hours * 3600 + minutes * 60 + seconds;
            }
            //Converting Seconds to HH MM SS
            function secondsToHMS(d) {
                d = Number(d);
                var h = Math.floor(d / 3600);
                var m = Math.floor(d % 3600 / 60);
                var s = Math.floor(d % 3600 % 60);
                return ((h > 0 ? h + ':' + (m < 10 ? '0' : '') : '') + m + ':' + (s < 10 ? '0' : '') + s);
            }

            // alert(getPlaylistDuration() + '(' + timeStamp.length + ')');
            return getPlaylistDuration() + '(' + timeStamp.length + ')';
        }

        var parentElement = document.getElementById('page-manager')
        var firstChildElement = parentElement.firstChild;

        //Create div and style it
        function createDiv() {
            var timeStampDiv = document.createElement('div');
            var HMSDuration = getDurationAndVideoCount();
            var textNodeText = document.createTextNode(HMSDuration);
            var headerPara = document.createElement('p');
            var headerText = document.createTextNode('Playlist Duration');
            var durationSpan = document.createElement('span');
            timeStampDiv.style.cssText = 'right: 0px; font-size: small;color: #000000; position: fixed; float: right; display: inline-block; z-index: 1; padding: 3px; text-align: center; border-style: dotted; background-color: rgba(249, 249, 249, 0.74902);';
            timeStampDiv.onclick = function () {
                url = window.location['href']
                if (url.indexOf("/playlist?list=") != -1) {
                    textNodeText.nodeValue = getDurationAndVideoCount()
                } else {
                    timeStampDiv.style.display = 'none';
                }
            };
            headerPara.appendChild(headerText);
            headerPara.style.cssText = 'font-weight: 500; color: #404040;';
            durationSpan.appendChild(textNodeText);
            timeStampDiv.appendChild(headerPara);
            timeStampDiv.appendChild(durationSpan);
            parentElement.insertBefore(timeStampDiv, firstChildElement);
        }
        createDiv();
    };
} else { }
