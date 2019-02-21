import React from "react";
import dateFns from "date-fns";



class Calendar extends React.Component {
   
  getClassName=(month) => {
    return dateFns.format(month, "MMMM")
  }

    renderHeader() {
        const dateFormat = "MMMM YYYY";
        return (
          <div className={this.getClassName(this.props.currentMonth)}>
            <div className="header row flex-middle">
              <div className="col col-start">
                <div className="icon" onClick={this.props.prevMonth}>
                  chevron_left
                </div>
              </div>
              <div className="col col-center">
                <span>
                  {dateFns.format(this.props.currentMonth, dateFormat)}
                </span>
              </div>
              <div className="col col-end" onClick={this.props.nextMonth}>
                <div className="icon">chevron_right</div>
              </div>
            </div>
          </div>
        );
      }

    
    

      renderDays=()=>{
        const dateFormat = "ddd";
        const days = [];
        let startDate = dateFns.startOfWeek(this.props.currentMonth, {weekStartsOn:1});
        for (let i = 0; i < 7; i++) {
          days.push(
            <div className="col col-center" key={i}>
              {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
            </div>
          );
        }
        return <div className="days row">{days}</div>;
      }

    renderCells=()=>{
        const currentMonth = this.props.currentMonth;
        const selectedDate = this.props.selectedDate;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart, {weekStartsOn:1});
        const endDate = dateFns.endOfWeek(monthEnd,{weekStartsOn:1});
      
        const dateFormat = "D";
        const rows = [];
        
        let days = [];
        let day = startDate;
        let formattedDate = "";
        
            while (day <= endDate) {
              for (let i = 0; i < 7; i++) {
                formattedDate = dateFns.format(day, dateFormat);
                const cloneDay = day;
                days.push(
                  <div
                    className={`col cell ${
                      dateFns.isSameMonth(day, monthStart)
                        ? dateFns.isSameDay(day, selectedDate) ? "selected" : ""
                        : "disabled"
                    }`}
                    key={day}
                    onClick={() => {this.props.onDateClick(dateFns.parse(cloneDay));}}
                  >
                    <span className="number">{formattedDate}</span>
                    <span className="bg">{formattedDate}</span>
                  </div>
                );
                day = dateFns.addDays(day, 1);
              }
              rows.push(
                <div className="row" key={day}>
                  {days}
                </div>
              );
              days = [];
            }
            return <div className="body">{rows}</div>;
          
    }


  render() {
    return (
        <div className="calendar">
            {this.renderHeader()}
            {this.renderDays()}
            {this.renderCells()}
        </div>
    );
  }
}

export default Calendar;