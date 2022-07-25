import React, {
    FC,
    forwardRef,
    useEffect,
    useImperativeHandle,
    useMemo,
    useState,
} from "react";

import useTableActions from "../actions/useTableActions";
import * as antd from "antd";
import {Box, Typography} from "@mui/material";

interface TableMsg {
    tableNum: string;
    persons: string
}

const OpenTableStage = forwardRef((props, ref) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [portion, setPortion] = useState(1);
    const [tableMsg, setTableMsg] = useState<TableMsg>({
        tableNum: "",
        persons:""
    });

    const tableActions = useTableActions();

    const onOpenStage = async () => {
        setConfirmLoading(true);
        const personsStr = String(portion);
        await tableActions.openStage(
            tableMsg.tableNum as string,
            personsStr as string
        );
        setModalVisible(false);
        setConfirmLoading(false);
    };

    useImperativeHandle(ref, () => ({
        tableStageOpen(props: TableMsg) {
            setTableMsg(props);
            setModalVisible(true);
        },

        productDialogClose() {
            handleClose();
        },
    }));
    const handleClose = () => {
        setModalVisible(false)
        setPortion(1);
        setTableMsg({
            tableNum: "",
            persons: ""
        });
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

    useEffect(() => {
        if (formGroupRef.current) {
            // Array.prototype.slice
            //     .call(formGroupRef.current.children)
            //     .map((item) => console.log(item.id));
        }
    });

    return (
        <antd.Modal
            title={"开台：" + tableMsg.tableNum + " 号桌"}
            okText={"开台"}
            cancelText={"取消"}
            centered
            visible={modalVisible}
            confirmLoading={confirmLoading}
            onOk={() => onOpenStage()}
            onCancel={() => handleClose()}
        >
            <Box sx={{display: "flex"}}>
                <antd.Button
                    type="primary"
                    size="middle"
                    disabled={portion <= 1}
                    onClick={() => setPortion((pre) => pre - 1)}
                >
                    -
                </antd.Button>
                <Typography align="center" sx={{flexGrow: 1}}>
                    就餐人数：{portion} 人
                </Typography>
                <antd.Button
                    type="primary"
                    size="middle"
                    onClick={() => setPortion((pre) => pre + 1)}
                >
                    +
                </antd.Button>
            </Box>
        </antd.Modal>
    );
});

export default OpenTableStage;
