import React, {
    FC,
    forwardRef,
    useEffect,
    useImperativeHandle,
    useMemo, useRef,
    useState,
} from "react";

import useTableActions from "../actions/useTableActions";
import OpenTableStage from "../components/OpenTableStage";
import tableState from "../state/tableState";
import * as antd from "antd";
import {useRecoilState} from "recoil";
import {DrawerProps} from "antd";


const TableDrawer = forwardRef((props, ref) => {
    const [table, setTable] = useRecoilState<any>(tableState);
    const [visible, setVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState<DrawerProps['placement']>('top');

    const openTableStage = useRef<any>();
    const tableActions = useTableActions();

    const onQueryTables = async () => {
        await tableActions.getTables();
    };

    useImperativeHandle(ref, () => ({
        tableDrawerOpen() {
            onQueryTables();
            setVisible(true);
        },

        productDialogClose() {
            onClose();
        },
    }));

    const onClose = () => {
        setVisible(false);
    };

    const descriptionElementRef = React.useRef<HTMLElement>(null);
    const formGroupRef = React.useRef<HTMLElement>(null);
    useEffect(() => {
        if (open) {
            const {current: descriptionElement} = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);


    return (
        <antd.Drawer
            title="桌号选择"
            placement={placement}
            closable={false}
            onClose={onClose}
            visible={visible}
            key={placement}
            height="60%"
            contentWrapperStyle={{justifyContent: 'center'}}
        >

            {/*<Box sx={{display: "flex"}}>*/}

            <antd.Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>

                <antd.Col span={24}>
                    <antd.Space size={[10, 20]} wrap>
                        {table?.map((item: any) => (
                            <antd.Button
                                style={item.isLock === 0 ?
                                    {
                                        color: "rgb(24,144,255)",
                                        backgroundColor: "white",
                                        width: "62.4px",
                                        height: "62.4px",
                                    } : {
                                        width: "62.4px",
                                        height: "62.4px",
                                    }}
                                type="primary"
                                size="large"
                                // 1.如果isLock为1 即已经开台 走调购物车逻辑
                                // 2.如果isLock为0 即未开台 走调开台逻辑 即锁定该桌号
                                onClick={item.isLock === 1 ?
                                    () => {
                                        // TODO
                                    }
                                    : () => {
                                        openTableStage.current.tableStageOpen(item);
                                    }}

                            >{item.tableNum}</antd.Button>
                            // <Button sx={{ width: "0.5rem", height: "2rem" }} color="info" variant="outlined">{item.tableNum}</Button>
                        ))}
                    </antd.Space>

                </antd.Col>

            </antd.Row>

            <OpenTableStage ref={openTableStage}/>

        </antd.Drawer>
    );
});

export default TableDrawer;
