if (!props.widgets || props.widgets.length === 0) return <></>;

const [waitingAppIdsSet, changeWaitingAppIdsSet] = useState(new Set())

const handleRemoveWidget = (linkId) => {
  changeWaitingAppIdsSet((val) => val.add(linkId));
  const callback = () => {
    waitingAppIdsSet.delete(linkId)
    changeWaitingAppIdsSet((val) => {
      val.delete(linkId)
      return val
    });
  }
  props.deleteUserLink(linkId).then(callback).catch(callback);
}

const Container = styled.div`
  display: flex;
  gap: 8px;
  margin-left: 8px;
`;

const WidgetWrapper = styled.div`
  max-width: 100%;
  min-width: 18px;
  position: relative;
`;

const WidgetBadgeWrapper = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 1200;
  background: rgba(255, 255, 255, 0.35);
  width: 100%;
  height: 100%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  border-radius: 4%;
  backdrop-filter: blur(0.5px);
  div {
    padding: 2px;
  }
`;

return (
  <Container>
    {props.widgets
      .filter((w) => w.isSuitable === undefined || w.isSuitable === true)
      .map((widget) => (
        <WidgetWrapper key={widget.linkId}>
          {props.isEditMode ? (
            <WidgetBadgeWrapper
              title={
                widget.linkAuthorId === context.accountId
                  ? `Remove ${widget.src.split("widget/").pop()}`
                  : "disable in edit mode "
              }
              style={{
                opacity: widget.linkAuthorId === context.accountId ? "1" : "0",
              }}
            >
              {widget.linkAuthorId === context.accountId ? waitingAppIdsSet.has(widget.linkId) ? (
                <span role="status" aria-hidden="true" class="spinner-grow spinner-grow-sm" />
              ) : (
                <Widget
                  src="bos.dapplets.near/widget/LayoutManager.DeleteWidgetButton"
                  props={{
                    onClick: () => handleRemoveWidget(widget.linkId),
                  }}
                />
              ) : null}
            </WidgetBadgeWrapper>
          ) : null}
          <Widget src={widget.src} props={widget.props} />
        </WidgetWrapper>
      ))}
  </Container>
);
