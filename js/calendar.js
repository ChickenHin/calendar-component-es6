'use strict';

class Calendar {
    constructor() {
    	this.dateChoosen = new Date();
    	this.showDate = document.getElementById('date-info');
        this.calendarBlock = document.getElementById('calendar');
    }
    // 获取某年某月天数
    getMonthDays(year,month) {
    	if(month == 0) month == 12;
        if(month == 1 || month == 3|| month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
        	return 31;
        } else if(month == 4 || month == 6 || month == 9 || month == 11) {
        	return 30;
        } else {
            if((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
            	return 29;
            } else {
            	return 28;
            }
        }
    }
    // 创建日历
    createBlcok() {
    	let date = this.dateChoosen.getFullYear() + "年" + (this.dateChoosen.getMonth() + 1) + "月" + this.dateChoosen.getDate() + "日";
    	this.showDate.value = date;
        // 日历头部：上一个月
        let str = "<section><header><button>&lt</button><select>";
        // 日历头部：年份选择
        // 当前年份之前
        for(let yb = 1900; yb < this.dateChoosen.getFullYear(); yb++) {
            str += "<option>" + yb + "</option>";
        }
        // 当前年份
        str += "<option selected='selected'>" + this.dateChoosen.getFullYear() + "</option>";
        // 当前年份之后
        for(let ya = this.dateChoosen.getFullYear() + 1; ya < 2101; ya++) {
            str += "<option>" + ya + "</option>";
        }
        str += "</select><select>";
        // 日历头部：月份选择
        // 当前月份之前
        for(let mb = 1; mb < this.dateChoosen.getMonth() + 1; mb++) {
            str += "<option>" + mb + "</option>";
        }
        // 当前月份
        str += "<option selected='selected'>" + (this.dateChoosen.getMonth() + 1) + "</option>";
        // 当前月份之后
        for(let ma = this.dateChoosen.getMonth() + 2; ma < 13; ma++) {
            str += "<option>" + ma + "</option>";
        }
        // 日历头部：下一个月
        str += "</select><button>&gt</button></header>";
        // 星期头部
        str += "<header><span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span></header>";
        str += "<div>";
        // 找到本月一号是星期几
        let dateFirst = new Date(this.dateChoosen);
        dateFirst.setDate(1);
        let dateFirstWeek = dateFirst.getDay();
        // 获取本月天数
        let dateDays = this.getMonthDays(this.dateChoosen.getFullYear(),(this.dateChoosen.getMonth() + 1));
        // 获取上月天数
        let lastDateDays = this.getMonthDays(this.dateChoosen.getFullYear(),this.dateChoosen.getMonth());
        // 由于日历共有六行七列，可能会包含上月和下月的部分日期
        // 上月日期生成
        for(let i = dateFirstWeek; i >0; i--) {
        	str += "<span class='last-month-span'>" + (lastDateDays - i + 1) +"</span>";
        }
        // 本月日期生成
        for(let j = 1; j < dateDays + 1; j++) {
        	if(j == this.dateChoosen.getDate()) {
                str += "<span class='current-day-span'>"+ j + "</span>";
        	} else {
        		str += "<span class='current-month-span'>" + j +"</span>";
        	}
        }
        // 下月日期生成
        for(let k = 1; k <= 42 - dateDays - dateFirstWeek; k++) {
        	str += "<span class='next-month-span'>" + k + "</span>";
        }
         str += "</div></section>";
         this.calendarBlock.innerHTML = str;
         this.clickEvent();
    }
    // 点击事件
    clickEvent() {
        let self = this;
        // 载入事件处理模块
        require(['event'], function (EventUtil){
            let dateSection = document.getElementsByTagName('section')[0];
            let dayDivs = dateSection.getElementsByTagName('div')[0];
            let clickBtn = dateSection.getElementsByTagName('button');
            let clickSel = dateSection.getElementsByTagName('select');
            // 点击日期选中，不能选其他月的日期
            EventUtil.addHandler(dayDivs, 'click', function(e) {
                let ev = EventUtil.getEvent(e);
                let eTarget = EventUtil.getTarget(ev);
                if(!((eTarget.className == 'current-month-span') || (eTarget.className == 'current-day-span'))) {
                    alert("超出选择范围");
                    return;
                } else {
                    let strClick = (self.dateChoosen.getMonth() + 1) + "/" + eTarget.innerHTML + "/" + self.dateChoosen.getFullYear();
                    self.dateChoosen = new Date(strClick);
                    self.createBlcok();
                    self.calendarBlock.style.display = "none";
                }
            });
            // 上一个月，默认选中一号
            EventUtil.addHandler(clickBtn[0], 'click', function() {
                // 如果是一月，变成上一年12月
                if(self.dateChoosen.getMonth() == 0) {
                    let strPrev = 12 + "/" + 1 + "/" + (self.dateChoosen.getFullYear() - 1);
                    self.dateChoosen = new Date(strPrev);
                } else {
                    let strPrev = (self.dateChoosen.getMonth()) + "/" + 1 + "/" + self.dateChoosen.getFullYear();
                    self.dateChoosen = new Date(strPrev);
                }
                self.createBlcok();
            });
            // 下一个月，默认选中一号
            EventUtil.addHandler(clickBtn[1], 'click', function() {
                // 如果是十二月，变成下一年1月
                if(self.dateChoosen.getMonth() == 11) {
                    let strNext = 1 + "/" + 1 + "/" + (self.dateChoosen.getFullYear() + 1);
                    self.dateChoosen = new Date(strNext);
                } else {
                    let strNext = (self.dateChoosen.getMonth() + 2) + "/" + 1 + "/" + self.dateChoosen.getFullYear();
                    self.dateChoosen = new Date(strNext);
                }
                self.createBlcok();
            });
            // 选择年份
            EventUtil.addHandler(clickSel[0], 'change', function() {
                let strYear = (self.dateChoosen.getMonth() + 1) + "/" + 1 + "/" + clickSel[0].getElementsByTagName('option')[clickSel[0].selectedIndex].innerHTML;
                self.dateChoosen = new Date(strYear);
                self.createBlcok();
            });
            // 选择月份
            EventUtil.addHandler(clickSel[1], 'change', function() {
                let strMon = clickSel[1].getElementsByTagName('option')[clickSel[1].selectedIndex].innerHTML + "/" + 1 + "/" + self.dateChoosen.getFullYear();
                self.dateChoosen = new Date(strMon);
                self.createBlcok();
            });
            // 点击输入框显示日历
            EventUtil.addHandler(self.showDate, 'focus', function() {
                self.calendarBlock.style.display = "block";
            });
　　    });
        
    }
    init() {
    	this.createBlcok();
        this.calendarBlock.style.display = "none";
    }
}
let cal = new Calendar();
cal.init();