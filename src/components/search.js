import React from 'react';
import axios from 'axios'
import { Divider, Dropdown, Button } from 'semantic-ui-react';
import {yearOptions} from '../constants/years'
import {
    urlGetBranchAndDegreeData,
    urlGetFilteredStudents,
} from '../urls'

import '../css/search.css'

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterYear: [],
            filterBranch: [],
            filterDegree: [],
            filterBY: [],
            branches: {},
            degrees: {},
            filterStudents: [],
        }
    }

    componentDidMount() {
        this.getBranchAndDegrees()
    }

    getBranchAndDegrees() {
        axios
            .get(urlGetBranchAndDegreeData())
            .then(res => {
                this.setState({
                    branches: res.data.branches,
                    degrees: res.data.degrees,
                })
            })
            .catch(() => {

            })
    }

    onChange = (event, { name, value }) => {
        let filter = ''
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value }, () => {

                if (this.state.filterBranch != '') {
                    filter = `${filter}branch=${this.state.filterBranch}&`
                }

                if (this.state.filterDegree != '') {
                    filter = `${filter}degree=${this.state.filterDegree}&`
                }

                if (this.state.filterYear != '') {
                    filter = `${filter}year=${this.state.filterYear}&`
                }

                if (this.state.filterBY != '') {
                    filter = `${filter}branch_year=${this.state.filterBY}&`
                }

                axios
                    .get(urlGetFilteredStudents(filter))
                    .then(res => {
                        this.setState({
                            filterStudents: res.data,
                        })
                        let filteredArray = res.data
                        if (this.props.ids) {
                            var idArray = filteredArray.map(s => s.id);
                            this.props.addFilteredStudents(idArray)
                        } else {
                            this.props.addFilteredStudents(filteredArray)
                        }
                    })
                    .catch(() => {

                    })

            })
        }
    }

    render() {
        const { branches, degrees, filterYear, filterBranch, filterDegree, filterBY } = this.state
        const { shareWithAll } = this.props
        let branchOptions = []
        let degreeOptions = []
        let byOptions = []

        for (const i in branches) {
            branchOptions.push({
                key: i.toString(),
                value: i.toString(),
                text: branches[i].toString(),
            });
        }
        for (const i in degrees) {
            degreeOptions.push({
                key: i.toString(),
                value: i.toString(),
                text: degrees[i].toString(),
            });
        }

        for (const i in yearOptions) {
            for (const j in branches) {
                byOptions.push({
                    key: yearOptions[i].value.toString() + '.' + j.toString(),
                    value: yearOptions[i].value.toString() + '.' + j.toString(),
                    text: yearOptions[i].text + " " + branches[j].toString(),
                });
            }
        }

        return (
            <div styleName='container'>
                <div styleName='filterContainer'>
                    <div styleName='filter-1'>
                        <Dropdown
                            name="filterYear"
                            clearable
                            multiple
                            search
                            options={yearOptions}
                            disabled={shareWithAll}
                            onChange={this.onChange}
                            placeholder="Filter by year"
                            value={filterYear}
                            selection
                        />
                        <Dropdown
                            name="filterDegree"
                            clearable
                            multiple
                            search
                            disabled={shareWithAll}
                            placeholder="Filter by degree"
                            value={filterDegree}
                            onChange={this.onChange}
                            options={degreeOptions}
                            selection
                        />
                        <Dropdown
                            name="filterBranch"
                            clearable
                            multiple
                            search
                            disabled={shareWithAll}
                            placeholder="Filter by branch"
                            value={filterBranch}
                            onChange={this.onChange}
                            options={branchOptions}
                            selection
                        />
                    </div>
                    <Divider />
                    <div styleName='filter-2'>
                        <Dropdown
                            name="filterBY"
                            clearable
                            multiple
                            search
                            disabled={shareWithAll}
                            placeholder="Filter by branch-year"
                            value={filterBY}
                            onChange={this.onChange}
                            options={byOptions}
                            selection
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Search
