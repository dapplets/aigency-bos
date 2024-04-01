const SelectedMutationEditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  top: 217px;
  left: 760px;
  padding: 20px;
  gap: 20px;
  border-radius: 10px;
  border: 1px solid #02193a;
  background: #f8f9ff;
  width: 400px;
  max-height: 646px;
`;

const HeaderEditor = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(2, 25, 58, 1);
  font-family: Roboto;
  font-size: 18px;
  font-weight: 600;
  line-height: 21.09px;
  text-align: left;
`;
const ButtonsBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonsRevert = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(226, 226, 229, 1);
  color: rgba(2, 25, 58, 1);
  width: 175px;
  height: 42px;
  border-radius: 10px;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  line-height: 20.86px;
  text-align: center;
`;
const ButtonsSave = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 175px;
  height: 42px;
  border-radius: 10px;
  background: rgba(56, 75, 255, 1);
  color: #fff;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  line-height: 20.86px;
  text-align: center;
`;

const closeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
  >
    <path
      d="M21 9L9 21"
      stroke="#02193A"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9 9L21 21"
      stroke="#02193A"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
const iconEdit = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M12 18H19"
      stroke="#7A818B"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15.2504 5.47176C15.5524 5.1697 15.9621 5 16.3893 5C16.6008 5 16.8103 5.04166 17.0057 5.12261C17.2011 5.20355 17.3787 5.32219 17.5282 5.47176C17.6778 5.62133 17.7964 5.79889 17.8774 5.99431C17.9583 6.18972 18 6.39917 18 6.61069C18 6.82221 17.9583 7.03166 17.8774 7.22708C17.7964 7.42249 17.6778 7.60006 17.5282 7.74962L8.03715 17.2407L5 18L5.75929 14.9629L15.2504 5.47176Z"
      stroke="#7A818B"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
return (
  <div>
    <SelectedMutationEditorWrapper>
      <HeaderEditor>
        Some Mutation Name
        {closeIcon}
      </HeaderEditor>
      <div>
        {" "}
        <Widget
          src="bos.dapplets.near/widget/ApplicationCard"
          props={{
            src: app.id,
            metadata: app.metadata,
            onComponentSelect: () => props.onSelect(app),
            hideButtons: !context.accountId,
          }}
        />
      </div>
      <ButtonsBlock>
        <ButtonsRevert>Revert changes</ButtonsRevert>
        <ButtonsSave>Save</ButtonsSave>
      </ButtonsBlock>
    </SelectedMutationEditorWrapper>
  </div>
);
