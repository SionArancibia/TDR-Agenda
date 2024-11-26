import { BaseToast } from 'react-native-toast-message';

const customToastConfig = {
    success: (props) => (
        <BaseToast
            {...props}
            style={{
                borderLeftColor: '#49BA98',
                paddingVertical: 10,
                paddingHorizontal: 15,
                height: "auto",
            }}
            contentContainerStyle={{
                paddingHorizontal: 15,
            }}
            text1Style={{
                fontSize: 20,
                fontWeight: 'bold',
                flexWrap: 'wrap',
            }}
            text1NumberOfLines={0}
            text2Style={{
                fontSize: 16,
                flexWrap: 'wrap',
            }}
            //text2NumberOfLines={0}
        />
    ),
    error: (props) => (
        <BaseToast
            {...props}
            style={{
                borderLeftColor: '#FF6347',
                paddingVertical: 10,
                paddingHorizontal: 15,
                height: "auto",
            }}
            contentContainerStyle={{
                paddingHorizontal: 15,
            }}
            text1Style={{
                fontSize: 20,
                fontWeight: 'bold',
                flexWrap: 'wrap',
            }}
            text1NumberOfLines={0}
            text2Style={{
                height: "auto",
                fontSize: 16,
                flexWrap: 'wrap',
            }}
            text2NumberOfLines={0}
        />
    ),
};

export default customToastConfig;