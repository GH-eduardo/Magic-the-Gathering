import IErrorResponse from "@/services/dto/error-response";
import { isAxiosError } from "axios";

const handleAxiosError = (error: unknown): IErrorResponse => {
    if (isAxiosError(error)) {
        const status = error.response?.status || 500;
        const responseData = error.response?.data;

        if (status == 500) {
            return {
                code: status,
                error: {
                    message: "O servidor não foi capaz de responder. Tente novamente dentro de alguns minutos."
                }
            }
        }

        if (!responseData) {
            return {
                code: status,
                error: {
                    message: "Resposta vazia do servidor. Por favor, tente novamente mais tarde."
                }
            };
        } else {
            return {
                code: status,
                error: responseData.message
            }
        }
    } else {
        return {
            code: 500,
            error: {
                message: "Erro na requisição. Por favor, tente novamente dentro de alguns minutos."
            }
        };
    }
};

export default handleAxiosError;