export const extractIP = (ip) => {
    const ipv4 = /(\d+\.\d+\.\d+\.\d+)$/;
    const match = ip.match(ipv4);
    return match ? match[1] : null;
}