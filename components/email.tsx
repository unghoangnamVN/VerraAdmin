import { Html, Body, Section, Text } from '@react-email/components'

interface EmailProps {
    name: string
    email?: string
    phone: string
    address: string
    data: any
}

export function Email({ name, email, phone, address, data }: EmailProps) {
    return (
        <Html>
            <Body>
                <Section>
                    <Text>Name: {name}</Text>
                    <Text>Email: {email}</Text>
                    <Text>Phone: {phone}</Text>
                    <Text>Address: {address}</Text>
                </Section>
                <Section>
                    <Text>Please review the order details:</Text>
                    {/* {data.map((item: any) => (
            <Text id={item.uuid}>
              {item.name} ({Object.values(item.options).join(", ")}) x
              {item.quantity}
            </Text>
          ))} */}
                </Section>
                <Section></Section>
            </Body>
        </Html>
    )
}
