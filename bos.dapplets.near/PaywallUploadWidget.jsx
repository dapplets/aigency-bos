State.init({
  img: null,
  isUpload: false,
  amount: 1,
});
const uploadFileUpdateState = (body) => {
  asyncFetch("https://ipfs.near.social/add", {
    method: "POST",
    headers: { Accept: "application/json" },
    body,
  }).then((res) => {
    const cid = res.body.cid;
    State.update({ img: { cid } });
  });
};

const filesOnChange = (files) => {
  if (files) {
    State.update({ img: { uploading: true, cid: null } });
    uploadFileUpdateState(files[0]);
  }
};

const amountOnChange = ({ target }) => {
  State.update({ amount: target.value });
};

const sendOnChange = () => {
  State.update({
    isUpload: true,
  });
};

const cancelOnChange = () => {
  State.update({
    img: null,
    isUpload: false,
    amount: 1,
  });
};
const iconBtnUpload = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M17 8L12 3L7 8"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12 3V15"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const WrapperWidget = styled.div`
  display: flex;
  flex-direction: column;
  width: 509px;
  padding: 10px;
  height: 247px;
  border-radius: 16px;
  border: 1px solid #8899a6;
  background: #fff;
  .ButtonUpload {
    cursor: pointer;
    border-radius: 4px;
    background: #3d7fff;
    width: 128px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px;
    color: #fff;
    font-family: Roboto;
    font-size: 14px;
    font-weight: 400;
    line-height: normal;
    &:hover {
      opacity: 0.5;
    }
  }
`;

const Title = styled.div`
  color: #222;
  font-family: Roboto;
  font-size: 18px;
  font-weight: 700;
  line-height: normal;
  padding-bottom: 10px;
`;

const InputsBlock = styled.div`
  border-radius: 4px;
  border: 1px solid #c1c6ce;
  padding: 10px;
  width: 489px;
  height: 142px;
  margin-bottom: 14px;
`;

const UploadBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
`;

const FileInput = styled.input`
  border-radius: 4px;
  background: #e7ecef;
  display: flex;
  height: 44px;
  padding: 10px;
  width: 331px;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  color: #222;
  border: none;
  outline: none;
`;

const BlockAmount = styled.div`
  border-radius: 4px;
  border: 1px solid #c1c6ce;
  background: #fff;

  display: flex;
  height: 44px;
  padding: 4px 10px;
  width: 469px;
  flex-direction: column;
`;
const LabelAmount = styled.div`
  color: #919191;
  font-family: Roboto;
  font-size: 12px;
  font-weight: 400;
  line-height: normal;
`;
const ButtonsBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  width: 489px;
`;

const InputAmount = styled.input`
  color: #222;
  font-family: Roboto;
  font-size: 14px;
  background: #fff;
  font-weight: 400;
  line-height: normal;
  border: none;
  outline: none;
  width: 449px;
  height: 16px;
`;

const ButtonCancel = styled.button`
  border-radius: 4px;
  display: flex;
  background: #c1c6ce;
  border: none;
  outline: none;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-family: Roboto;
  font-size: 14px;
  width: 230px;
  height: 44px;
  font-weight: 400;
  line-height: 149%;
  &:hover {
    opacity: 0.3;
  }
`;
const ButtonSend = styled.button`
  border-radius: 4px;
  display: flex;
  background: #3d7fff;
  border: none;
  outline: none;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-family: Roboto;
  font-size: 14px;
  width: 230px;
  height: 44px;
  font-weight: 400;
  line-height: 149%;
  &:hover {
    opacity: 0.5;
  }

  &:disabled {
    opacity: 0.5;
  }
`;
return (
  <>
    {state.img.cid && state.isUpload ? (
      <img
        src={`https://ipfs.near.social/ipfs/${state.img.cid}`}
        alt="uploaded"
      />
    ) : (
      <WrapperWidget>
        <Title>Configure your content</Title>
        <InputsBlock>
          <UploadBlock>
            <FileInput readOnly value={state.img.cid ? state.img.cid : ""} />

            <Files
              multiple={false}
              accepts={["image/*"]}
              minFileSize={1}
              clickable
              className="ButtonUpload"
              onChange={filesOnChange}
            >
              {iconBtnUpload}
              {state.img?.uploading ? <> Uploading </> : "Upload image"}
            </Files>
          </UploadBlock>

          <BlockAmount>
            <LabelAmount>Amount (NEAR)</LabelAmount>
            <InputAmount
              value={state.amount ? state.amount : ""}
              onChange={amountOnChange}
            />
          </BlockAmount>
        </InputsBlock>
        <ButtonsBlock>
          <ButtonCancel onClick={cancelOnChange}>Cancel</ButtonCancel>
          <ButtonSend
            onClick={sendOnChange}
            disabled={!state.img || !state.amount}
          >
            Send
          </ButtonSend>
        </ButtonsBlock>
      </WrapperWidget>
    )}
  </>
);
