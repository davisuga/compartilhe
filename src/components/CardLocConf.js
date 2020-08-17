import React, { Component } from "react";
import { Text, View } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

export default class CardLocConf extends Component {
    render() {
        return (
            <View>
                <Text> textInComponent </Text>
                <Card>
                    <Card.Title
                        title="Card Title"
                        subtitle="Card Subtitle"
                        left={props => <Avatar.Icon {...props} icon="folder" />}
                    />
                    <Card.Content>
                        <Title>Card title</Title>
                        <Paragraph>Card content</Paragraph>
                    </Card.Content>
                    <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
                    <Card.Actions>
                        <Button>Cancel</Button>
                        <Button>Ok</Button>
                    </Card.Actions>
                </Card>
            </View>
        );
    }
}
