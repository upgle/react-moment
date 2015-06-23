
var ReactMoment = (function(){
    var SetIntervalMixin, component;

    SetIntervalMixin = {
        componentWillMount: function() {
            this.intervals = [];
        },
        setInterval: function() {
            this.intervals.push(setInterval.apply(null, arguments));
        },
        componentWillUnmount: function() {
            this.intervals.map(clearInterval);
        }
    };
    component = React.createClass({displayName: "component",
        mixins: [SetIntervalMixin],
        propTypes: {
            date: React.PropTypes.oneOfType([
                React.PropTypes.string,
                React.PropTypes.number
            ]).isRequired,
            date_type: React.PropTypes.string,
            interval : React.PropTypes.number
        },
        getDefaultProps: function() {
            return {
                interval: 1000
            };
        },
        shouldComponentUpdate: function(nextProps) {
            if(this.props.date !== nextProps.date) return true;
            if(this.props.date_type !== nextProps.date_type) return true;
            if(this.props.interval !== nextProps.interval) return true;
            return false;
        },
        componentDidMount: function() {
            if(this.props.date)
            {
                this.moment();
                this.setInterval(this.moment, this.props.interval);
            }
        },
        moment: function() {
            this.refs.moment.getDOMNode().innerHTML = moment(this.props.date, this.props.date_type).fromNow();
        },
        render : function() {
            return (React.createElement("span", {ref: "moment"}));
        }
    });
    return component;
})();


