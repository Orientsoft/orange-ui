import React from "react";
import { connect } from "react-redux";
import { Tabs, Icon } from "antd";
import { Link } from "react-router-dom";
import { changeKey, deleteTab, addNav } from "../../store/action";
import store from "../../store/store";

const { TabPane } = Tabs;

class Navigate extends React.Component {
  onChange = key => {
    store.dispatch(changeKey(`${key}`));
  };
  onEdit = (targetKey, action) => {
    // 如果删除tab是当前选中tab
    if (this.props.activeKey === targetKey) {
      // 只有一个可删tab跳到首页,
      if (this.props.navageData.length === 1) {
        store.dispatch(changeKey('0'));
        store.dispatch(deleteTab(Number(targetKey)));
        this.props.history.push("/");
        return;
      }
      // 删除最后一个则补足前一个
      if (
        this.props.navageData[this.props.navageData.length - 1].id ===
        Number(targetKey)
      ) {
        const { state, ...item } = this.props.navageData[this.props.navageData.length - 2];
        store.dispatch(deleteTab(Number(targetKey)));
        store.dispatch(addNav(item, state));
        store.dispatch(changeKey(item.id));
        this.props.history.push({ pathname: item.path, state });
        return;
      }

      // 删除中间则补足后一个
      const index = this.props.navageData.findIndex(
        v => v.id === Number(targetKey)
      );
      const { state, ...item } = this.props.navageData[index + 1];
      store.dispatch(deleteTab(Number(targetKey)));
      store.dispatch(addNav(item, state));
      store.dispatch(changeKey(item.id));
      this.props.history.push({ pathname: item.path, state });
      return;
    }
    store.dispatch(deleteTab(Number(targetKey)));
  };
  render() {
    return (
      <Tabs
        activeKey={this.props.activeKey}
        onChange={this.onChange}
        type="editable-card"
        hideAdd
        onEdit={this.onEdit}
      >
        <TabPane
          key='0'
          closable={false}
          tab={
            <Link to="/">
              <Icon
                type="bank"
                style={{ fontSize: "24px", marginTop: "4px" }}
              />
            </Link>
          }
        />
        {this.props.navageData.map(v => {
          return (
            <TabPane
              tab={
                <Link to={{ pathname: v.path, state: v.state }}>{v.name}</Link>
              }
              key={v.id}
            />
          );
        })}
      </Tabs>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    navageData: state.navageData,
    activeKey: `${state.activeKey}`
  };
};

//   const mapDispatchToProps = (dispatch, ownProps) => {
//     return {
//       onClick: () => {
//         dispatch(setVisibilityFilter(ownProps.filter))
//       }
//     }
//   }

export default connect(mapStateToProps)(Navigate);
