/**
 * Created by FPO Co.,Ltd - Sep 2021
 * Website: https://fpo.vn
 * Email: contact@fpo.vn
 */
'use strict'

const toLocateDateTime = (timestamp) => {
  let enWeekDay = [1, 2, 3, 4, 5, 6, 0]
  let viWeekDay = ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy', 'Chủ nhật']

  let localDate = new Date(timestamp).toLocaleDateString('vi-VN')
  let localTime = new Date(timestamp).toLocaleTimeString('vi-VN')

  let weekday = viWeekDay[enWeekDay.indexOf(new Date(timestamp).getDay())]

  let _date = localDate.split('/')
  let dd = _date[1]
  let mm = _date[0]
  let yyyy = _date[2]

  let _time = localTime
  let ii = _time.indexOf('AM') != -1 ? 'AM' : 'PM'
  _time = _time.replace(' ' + ii, '')
  let hrs = _time.split(':')[0]
  let min = _time.split(':')[1]
  let sec = _time.split(':')[2]

  return {
    weekDay: weekday,
    dd: dd,
    mm: mm,
    yyyy: yyyy,
    hrs: hrs,
    min: min,
    sec: sec,
    ii: ii,
  }
}

const getISODates = (myDate) => {
  let today = new Date(myDate)
  let dd = today.getDate()
  let mm = today.getMonth() + 1 //January is 0!

  let yyyy = today.getFullYear()
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  return {
    start: `${yyyy}-${mm}-${dd}T00:00:00.000Z`,
    end: `${yyyy}-${mm}-${dd}T23:59:59.000Z`,
  }
}
exports.getISODates = getISODates

const dateToString = (myDate) => {
  let today = new Date(myDate)
  let dd = today.getDate()
  let mm = today.getMonth() + 1 //January is 0!

  let yyyy = today.getFullYear()
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }

  return `${dd}/${mm}/${yyyy}`
}
exports.dateToString = dateToString

const dateTimeToString = (myDate, seperateStr = '') => {
  let day = toLocateDateTime(myDate)
  if (seperateStr == '') {
    return `${day.dd}/${day.mm}/${day.yyyy} ${day.hrs}:${day.min}:${day.sec} ${day.ii}`
  } else {
    return `${day.dd}/${day.mm}/${day.yyyy} ${seperateStr} ${day.hrs}:${day.min}:${day.sec} ${day.ii}`
  }
}
exports.dateTimeToString = dateTimeToString

exports.getWeekRange = (myDate) => {
  let enWeekDay = [1, 2, 3, 4, 5, 6, 0]
  // request a weekday along with a long date

  let day = enWeekDay.indexOf(new Date(myDate).getDay())
  let firstDay = ''
  let lastDate = ''
  switch (day) {
    case 0:
      firstDay = new Date(myDate).setDate(new Date(myDate).getDate() - 0)
      lastDate = new Date(myDate).setDate(new Date(myDate).getDate() + 6)
      break
    case 1:
      firstDay = new Date(myDate).setDate(new Date(myDate).getDate() - 1)
      lastDate = new Date(myDate).setDate(new Date(myDate).getDate() + 5)
      break
    case 2:
      firstDay = new Date(myDate).setDate(new Date(myDate).getDate() - 2)
      lastDate = new Date(myDate).setDate(new Date(myDate).getDate() + 4)
      break
    case 3:
      firstDay = new Date(myDate).setDate(new Date(myDate).getDate() - 3)
      lastDate = new Date(myDate).setDate(new Date(myDate).getDate() + 3)
      break
    case 4:
      firstDay = new Date(myDate).setDate(new Date(myDate).getDate() - 4)
      lastDate = new Date(myDate).setDate(new Date(myDate).getDate() + 2)
      break
    case 5:
      firstDay = new Date(myDate).setDate(new Date(myDate).getDate() - 5)
      lastDate = new Date(myDate).setDate(new Date(myDate).getDate() + 1)
      break
    case 6:
      firstDay = new Date(myDate).setDate(new Date(myDate).getDate() - 6)
      lastDate = new Date(myDate).setDate(new Date(myDate).getDate() + 0)
      break
  }
  return {
    firstDay: getISODates(firstDay).start,
    lastDate: getISODates(lastDate).end,
  }
}

exports.toISODateString = (myDate) => {
  let today = new Date(myDate)
  let dd = today.getDate()
  let mm = today.getMonth() + 1 //January is 0!
  let hrs = today.getHours()
  let min = today.getMinutes()
  let sec = today.getSeconds()

  let yyyy = today.getFullYear()
  if (dd < 10) dd = '0' + dd
  if (mm < 10) mm = '0' + mm
  if (hrs < 10) hrs = '0' + hrs
  if (min < 10) min = '0' + min
  if (sec < 10) sec = '0' + sec

  return `${yyyy}-${mm}-${dd}T${hrs}:${min}:${sec}.000Z`
}

exports.getRemainDay = (day) => {
  let today = new Date()
  let myDay = new Date(day)
  let timeDiff = Math.abs(myDay.getTime() - today.getTime())
  let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))

  if (diffDays == 0) {
    return 'Diễn ra hôm nay'
  } else {
    if (diffDays <= 30) {
      return 'Còn ' + diffDays + ' ngày nữa'
    } else {
      return 'Ngày ' + dateToString(myDay) + ' sẽ diễn ra'
    }
  }
}

exports.getTimeElapsed = (ptime) => {
  let secsOf = {
    min: 60,
    hour: 60 * 60,
    day: 60 * 60 * 24,
  }
  let today = new Date()
  let pday = new Date(ptime)
  let timeDiff = Math.round((today.getTime() - pday.getTime()) / 1000, 0)

  if (timeDiff < 0) {
    return dateTimeToString(pday)
  } else {
    if (timeDiff < 60) return 'Vừa mới xong'
    let d = Math.round(timeDiff / secsOf.day, 0)

    if (d >= 1) {
      if (d == 1) {
        return 'Ngày hôm qua'
      } else {
        return dateTimeToString(pday)
      }
    } else {
      if (d < 0) {
        return dateTimeToString(pday)
      } else {
        let h = Math.round(timeDiff / secsOf.hour, 0)
        if (h >= 1) {
          return h + ' giờ trước'
        } else {
          let m = Math.round(timeDiff / secsOf.min, 0)
          if (m >= 1) {
            return m + ' phút trước'
          } else {
            return timeDiff + ' giây trước'
          }
        }
      }
    }
  }
}

exports.formatMessageTimestamp = (timestamp) => {
  let today = new Date()
  let myDay = new Date(timestamp)
  let timeDiff = Math.abs(myDay.getTime() - today.getTime())
  let diffDays = Math.floor(timeDiff / (1000 * 3600 * 24))
  let weekDayString = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']

  let locateTime = toLocateDateTime(timestamp) //console.log(locateTime);

  if (diffDays == 0) {
    // today
    return `${locateTime.hrs}:${locateTime.min} ${locateTime.ii}`
  } else {
    if (diffDays >= 1 && diffDays <= 7) {
      return `${weekDayString[myDay.getDay()]}, ${locateTime.hrs}:${locateTime.min} ${locateTime.ii}`
    } else {
      if (diffDays <= 365) {
        return `${locateTime.dd}/${locateTime.mm}, ${locateTime.hrs}:${locateTime.min} ${locateTime.ii}`
      } else {
        return `${locateTime.dd}/${locateTime.mm}/${locateTime.yyyy}, ${locateTime.hrs}:${locateTime.min} ${locateTime.ii}`
      }
    }
  }
}

exports.formatEventTimestamp = (timestamp) => {
  let today = new Date()
  let myDay = new Date(timestamp)
  let timeDiff = Math.abs(myDay.getTime() - today.getTime())
  let diffDays = Math.floor(timeDiff / (1000 * 3600 * 24))
  let weekDayString = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']

  let locateTime = toLocateDateTime(myDay)

  if (diffDays == 0) {
    // today
    return `Ngày hôm nay, vào lúc  ${locateTime.hrs} giờ ${locateTime.min} phút`
  } else {
    if (diffDays == 1) {
      // tomorrow
      return `Ngày mai, vào lúc ${locateTime.hrs} giờ ${locateTime.min} phút`
    } else {
      return `${weekDayString[myDay.getDay()]}, ${locateTime.dd}/${locateTime.mm}/${locateTime.yyyy}, vào lúc ${
        locateTime.hrs
      }:${locateTime.min}`
    }
  }
}
