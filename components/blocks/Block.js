import React from 'react'
import Video from 'react-native-video'
import { Dimensions, View, Text, StyleSheet, Image } from 'react-native';
import ArrowUpBtn from '../buttons/ArrowUpBtn';
import ArrowDownBtn from '../buttons/ArrowDownBtn';
import EditBlockBtn from '../buttons/EditBlockBtn';
import RemoveBlockBtn from '../buttons/RemoveBlockBtn';

const Block = (item, Up, Down, Edit, Remove) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const styles = StyleSheet.create({
        blockView: {
            flex: 1,
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10,
            marginTop: 10,
            paddingTop: 5,
            paddingBottom: 5,
            marginBottom: 5,
            alignItems: 'center',
            width: '96%',
            marginLeft: '2%',
            paddingHorizontal: 5
        },
        arrowView: {
            flex: 1,
            alginSelf: 'flex-start',
            marginLeft: 5,
        },
        contentView: {
            flex: 6,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center'
        },
        buttonView: {
            flex: 1,
            alignItems: 'flex-end',
            marginRight: 5,
        },
        text: {
            color: 'black',
            fontSize: 16,
        }
    });

    const ShowByBlockType = (item) => {
        console.log(item.object)
        switch (item.type) {
            case 'Text':
                return (
                    <View style={styles.blockView}>
                        <View style={styles.arrowView}>
                            <ArrowUpBtn onPress={() => Up(item.id)} />
                            <ArrowDownBtn onPress={() => Down(item.id)} />
                        </View>
                        <View style={styles.contentView}>
                            <Text style={styles.text} key={item.key}>{item.object}</Text>
                        </View>
                        <View style={styles.buttonView}>
                            <EditBlockBtn onPress={() => Edit(item.id)} />
                            <RemoveBlockBtn onPress={() => Remove(item.id)} />
                        </View>
                    </View>
                )
            case 'Image':
                return (
                    <View style={styles.blockView}>
                        <View style={styles.arrowView}>
                            <ArrowUpBtn onPress={() => Up(item.id)} />
                            <ArrowDownBtn onPress={() => Down(item.id)} />
                        </View>
                        <View style={styles.contentView}>
                            <Image
                                key={item.key}
                                resizeMode="contain"
                                paused={false}
                                style={{
                                    aspectRatio: 1,
                                    width: "100%"
                                }}
                                source={{ uri: item.object.assets[0].uri }}
                            />
                        </View>
                        <View style={styles.buttonView}>
                            <EditBlockBtn onPress={() => Edit(item.id)} />
                            <RemoveBlockBtn onPress={() => Remove(item.id)} />
                        </View>
                    </View>
                )
            case 'Imageuri':
                return (
                    <View style={styles.blockView}>
                        <View style={styles.arrowView}>
                            <ArrowUpBtn onPress={() => Up(item.id)} />
                            <ArrowDownBtn onPress={() => Down(item.id)} />
                        </View>
                        <View style={styles.contentView}>
                            <Image
                                key={item.key}
                                resizeMode="contain"
                                paused={false}
                                style={{
                                    aspectRatio: 1,
                                    width: "100%"
                                }}
                                source={{ uri: item.object }}
                            />
                        </View>
                        <View style={styles.buttonView}>
                            <RemoveBlockBtn onPress={() => Remove(item.id)} />
                        </View>
                    </View>
                )
            case 'Video':
                return (
                    <View style={styles.blockView}>
                        <View style={styles.arrowView}>
                            <ArrowUpBtn onPress={() => Up(item.id)} />
                            <ArrowDownBtn onPress={() => Down(item.id)} />
                        </View>
                        <View style={styles.contentView}>
                            <Video
                                key={item.key}
                                resizeMode="contain"
                                paused={false}
                                style={{
                                    aspectRatio: 1,
                                    width: "100%"
                                }}
                                source={{ uri: item.object.assets[0].uri }}
                            />
                        </View>
                        <View style={styles.buttonView}>
                            <EditBlockBtn onPress={() => Edit(item.id)} />
                            <RemoveBlockBtn onPress={() => Remove(item.id)} />
                        </View>
                    </View>
                )
            case 'Videouri':
                return (
                    <View style={styles.blockView}>
                        <View style={styles.arrowView}>
                            <ArrowUpBtn onPress={() => Up(item.id)} />
                            <ArrowDownBtn onPress={() => Down(item.id)} />
                        </View>
                        <View style={styles.contentView}>
                            <Video
                                key={item.key}
                                resizeMode="contain"
                                paused={false}
                                style={{
                                    aspectRatio: 1,
                                    width: "100%"
                                }}
                                source={{ uri: item.object}}
                            />
                        </View>
                        <View style={styles.buttonView}>
                            <RemoveBlockBtn onPress={() => Remove(item.id)} />
                        </View>
                    </View>
                )
        }
    }
    return (
        ShowByBlockType(item)
    )
}

export default Block