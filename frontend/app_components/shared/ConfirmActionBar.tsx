import React, { useState } from "react";
import { View, Pressable, Text, StyleSheet, Dimensions } from "react-native";
import { ConfirmModal } from "./ConfirmModal"; // 아까 만든 모달 컴포넌트 재사용

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

type Props = {
    isAdmin: boolean,
    onAccept: () => void;
    onReject: () => void;
};

export function ConfirmActionBar({ isAdmin, onAccept, onReject }: Props) {
    const [mode, setMode] = useState<"accept" | "reject" | null>(null);

    if (!isAdmin) {
        return null;
    }

    return (
        <>
            <View style={styles.container}>
                <Pressable style={[styles.button, styles.accept]} onPress={() => setMode("accept")}>
                    <Text style={styles.acceptText}>수락</Text>
                </Pressable>
                <Pressable style={[styles.button, styles.reject]} onPress={() => setMode("reject")}>
                    <Text style={styles.rejectText}>거절</Text>
                </Pressable>
            </View>

            {mode && (
                <ConfirmModal
                    visible={true}
                    message={mode === "accept" ? "수락하시겠습니까?" : "거절하시겠습니까?"}
                    confirmColor={mode === "accept" ? "blue" : "red"}
                    onClose={() => setMode(null)}
                    onConfirm={() => {
                        if (mode === "accept") onAccept();
                        else if (mode === "reject") onReject();
                        setMode(null);
                    }}
                />
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: screenHeight * 0.01,
        paddingTop: screenHeight * 0.02,
    },
    button: {
        flex: 1,
        height: screenHeight * 0.055,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: screenHeight * 0.01,
    },
    accept: {
        backgroundColor: "#E5E6FF",
    },
    reject: {
        backgroundColor: "#FFE5E5",
    },
    acceptText: {
        color: "#454FE3",
        fontSize: 15,
        fontWeight: "500",
    },
    rejectText: {
        color: "#E02323",
        fontSize: 16,
        fontWeight: "500",
    },
});
