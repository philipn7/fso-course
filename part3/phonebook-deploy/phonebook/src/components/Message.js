const Message = ({ msg }) => {
  const messageStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (msg === '') return null;
  console.log(msg);
  return <div style={messageStyle}>{msg}</div>;
};

export default Message;
