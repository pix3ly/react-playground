import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './Home.css';

class Home extends React.Component {
    constructor() {
        super()

        this.state = {
            routes: [
                {
                    label: 'Alpha',
                    driver_id: 1,
                    hour: 10
                },
                {
                    label: 'Beta',
                    driver_id: null,
                    hour: null
                },
                {
                    label: 'Charlie',
                    driver_id: null,
                    hour: null
                }
            ],
            drivers: [
                {
                    id: 1,
                    name: 'Ali'
                },
                {
                    id: 2,
                    name: 'Mark'
                }
            ],
            hours: [9, 10, 11, 12, 13]
        }
    }

    drag(e) {
        e.dataTransfer.setData('text', e.target.id)
    }

    drop(e) {
        e.preventDefault()

        var data = e.dataTransfer.getData('text')

        e.target.appendChild(document.getElementById(data))
    }

    allowDrop(e) {
        e.preventDefault()
    }

    render() {
        return (
            <div>
                <h1>Drag & Drop</h1>
                <ul>
                    {this.state.routes.map((route) => {
                        if (!route.driver_id && !route.hour) {
                            return (
                                <li>
                                    <span draggable="true" onDragStart={this.drag} id={route.label}>Route {route.label}</span>
                                </li>
                            )
                        }
                    })}
                </ul>
                {this.state.drivers.map((driver) => {
                    return (
                        <div>
                            <h2>{driver.name}'s shift</h2>
                            <table>
                                <tbody>
                                    {this.state.hours.map((hour) => {
                                        return (
                                            <tr>
                                                <td>{hour}:00</td>
                                                <td onDrop={this.drop} onDragOver={this.allowDrop}>
                                                    {this.state.routes.map((route) => {
                                                        if (route.driver_id === driver.id && route.hour === hour) {
                                                            return (
                                                                <span draggable="true" onDragStart={this.drag} id={route.label}>Route {route.label}</span>
                                                            )
                                                        }
                                                    })}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default withStyles(styles)(Home);
