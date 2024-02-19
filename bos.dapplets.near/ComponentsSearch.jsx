const limitPerPage = 4;
let components = [];
let totalComponents = 0;
let totalApps = 0;
const componentsUrl = "/#/near/widget/ComponentsPage";

State.init({
  currentPage: 0,
  selectedTab: props.tab || "apps",
  selectedComponent: props.selectedComponent || null,
});

if (props.tab && props.tab !== state.selectedTab) {
  State.update({
    selectedTab: props.tab,
  });
}
const onSelect = (widget) => {
  try {
    State.update({
      selectedComponent: widget,
    });
  } catch (err) {
    console.error(err);
  }
};

const tagsData = Social.get("*/widget/*/metadata/tags/*", "final");

const data = Social.keys("*/widget/*", "final", {
  return_type: "BlockHeight",
});

if (data) {
  const result = [];

  Object.keys(data).forEach((accountId) => {
    return Object.keys(data[accountId].widget).forEach((widgetName) => {
      totalComponents++;

      const hasAppTag =
        tagsData[accountId].widget[widgetName]?.metadata?.tags["app"] === "";
      if (hasAppTag) totalApps++;

      if (state.selectedTab === "apps") {
        const hasAppTag =
          tagsData[accountId].widget[widgetName]?.metadata?.tags["app"] === "";
        if (!hasAppTag) return;
      }

      result.push({
        accountId,
        widgetName,
        blockHeight: data[accountId].widget[widgetName],
      });
    });
  });

  result.sort((a, b) => b.blockHeight - a.blockHeight);
  components = result;
}

function onSearchChange({ result, term }) {
  if (term.trim()) {
    State.update({ searchResults: result || [] });
  } else {
    State.update({ searchResults: null });
  }
}

const items = state.searchResults || components;
const selectedComponent = state.selectedComponent;

const CloseModal = styled.span`
  position: absolute;
          top: -40px;
          right: 0;
          cursor: pointer;
            transition: all 0.3s;
             &:hover {
      transform: scale(1.2);
    }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 15px;
  padding-right: 15px;
  position:absolute;
  left:50%;
  top:50%;
  gap: 12px;
  transform: translate(-50%,-50%);

  padding-bottom: 25px;
  padding-top: 50px;
  width: 422px;
  min-height: 350px;
max-height: 547px;
  border: 1px solid #d9d9d9;
  background: #fff;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.01) 0px 16px 16px 0px,
    rgba(0, 0, 0, 0.049) 0px 65px 65px 0px,
    rgba(0, 0, 0, 0.005) 0px 15px 17px 0px, rgba(0, 0, 0, 0.01) 0px 8px 13px 0px,
    rgba(0, 0, 0, 0) 0px 14px 13px 0px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
 
`;

const Search = styled.div`
  width: 392px;
  height: 46px;
position:relative;
  @media (max-width: 500px) {
    width: 100%;
  }
  input {
    border-radius: 10px;
    border: 1px solid #d9d9d9;
    background: #fff;
  }
`;

const H1 = styled.h1`
  font-weight: 600;
  font-size: 32px;
  line-height: 39px;
  color: #11181c;
  margin: 0;
`;

const H2 = styled.h2`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #687076;
  margin: 0;
`;

const Text = styled.p`
  margin: 0;
  line-height: 1.5rem;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")} !important;
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "")};
  white-space: ${(p) => (p.ellipsis ? "nowrap" : "")};
  overflow-wrap: anywhere;

  b {
    font-weight: 600;
    color: #11181c;
  }

  &[href] {
    display: inline-flex;
    gap: 0.25rem;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
      overflow: hidden;
    overflow-y: auto;
     transition: all 0.15s;
`;

const Item = styled.div`
  width: 100%;
  padding-top: 12px;
   transition: all 0.15s;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 8px;
  height: 32px;
  background: #fbfcfd;
  border: 1px solid #d7dbdf;
  border-radius: 50px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  cursor: pointer;
  color: #11181c !important;
  margin: 0;

  &:hover,
  &:focus {
    background: #ecedee;
    text-decoration: none;
    outline: none;
  }

  span {
    color: #687076 !important;
  }
`;
const iconCloseModal = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      d="M16.25 4.25L3.75 16.75"
      stroke="#C1C6CE"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M3.75 4.25L16.25 16.75"
      stroke="#C1C6CE"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

return (
  <Wrapper>
    <Search>
      <CloseModal onClick={props.handleCloseMenu}> {iconCloseModal}</CloseModal>

      <Widget
        src="bos.dapplets.near/widget/ComponentSearchWidget"
        props={{
          limit: 4,
          onChange: onSearchChange,
        }}
      />
    </Search>
    {state.searchResults?.length === 0 && (
      <Text>No components matched your search.</Text>
    )}
    {items.length > 0 && (
      <Items style={{ paddingRight: items && items.length >= 5 ? "20px" : "" }}>
        {items.map((component, i) => {
          return (
            <Item
              onClick={() => onSelect(component)}
              key={component.accountId + component.widgetName}
            >
              <Widget
                src="lisofffa.near/widget/SearchCard"
                props={{
                  src: `${component.accountId}/widget/${component.widgetName}`,
                  blockHeight: component.blockHeight,
                }}
              />
            </Item>
          );
        })}
      </Items>
    )}
  </Wrapper>
);
