function Rank(props) {
  const { rank } = props;
  const defaultStyle = {
    "margin-left": "15px",
    "border-radius": "10px",
    "background-color": "#7dca84cc",
    color: "#f1efe9",
    "text-align": "center",
    "font-family": "Noto Sans TC",
    "font-size": "18px",
    "font-style": "normal",
    "font-weight": "600",
    "line-height": "22.5px",
    "justify-content": "center",
    padding: "5px 15px 5px 15px",
  };

  const rankList = {
    icon_0: "普 0+",
    icon_6: "護 6+",
    icon_12: "輔 12+",
    icon_15: "輔 15+",
    icon_18: "限 18+",
  };

  const rankStyle = {
    icon_0: { ...defaultStyle },
    icon_6: { ...defaultStyle, "background-color": "#00ADEF" },
    icon_12: { ...defaultStyle, "background-color": "#e9bd1f" },
    icon_15: { ...defaultStyle, "background-color": "#F36717" },
    icon_18: { ...defaultStyle, "background-color": "#ED1C24" },
  };

  return <span style={rankStyle[rank]}>{rankList[rank]}</span>;
}

export default Rank;
