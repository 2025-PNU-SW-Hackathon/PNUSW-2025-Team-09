
import {getPaymentResponse} from "@/api/main/Payment/paymentApi";

export const getPaymentMock = async (): Promise<Record<number, getPaymentResponse[]>> => {
    const dataById: Record<number, getPaymentResponse[]> = {
        101: [
            {
                date: '2025.10.10 10:30',
                teacher: '김소영',
                place: '카페봄',
                payTo: '카페봄 사장님',
                description: '개발팀 미팅에서 커피 구매',
                status: '승낙',
            },
        ],
        102: [
            {
                date: '2025.10.10 10:30',
                teacher: '김태란',
                place: '카페봄',
                payTo: '카페봄 사장님',
                description: '개발팀 미팅에서 커피 구매',
                status: '거절',
            },
        ],
    };

    return dataById;
};