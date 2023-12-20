import "./keep.css";
import { Dropdown, TextInput } from "keep-react";
import { CaretRight, Gear, Money, SignOut, SquaresFour } from "phosphor-react";

export const Keep = () => {
    return (
        <div className="keepCont">

            <Dropdown
                label="Dropdown button"
                type="primary"
                size="sm"
                dismissOnClick={true}
            >
                <div className="px-5 pt-3 pb-2">
                    <TextInput id="#id-8yj95h" placeholder="Search" color="gray" />
                </div>
                <Dropdown.Item icon={<SquaresFour size={20} color="#5E718D" />}>
                    Dashboard
                    <span className="ml-auto">
                        <CaretRight size={20} color="#5E718D" />
                    </span>
                </Dropdown.Item>
                <Dropdown.Item icon={<Gear size={20} color="#5E718D" />}>
                    Settings
                    <span className="ml-auto">
                        <CaretRight size={20} color="#5E718D" />
                    </span>
                </Dropdown.Item>
                <Dropdown.Item icon={<Money size={20} color="#5E718D" />}>
                    Earnings
                    <span className="ml-auto">
                        <CaretRight size={20} color="#5E718D" />
                    </span>
                </Dropdown.Item>
                <Dropdown.Item icon={<SignOut size={20} color="#5E718D" />}>
                    Sign out
                </Dropdown.Item>
            </Dropdown>

        </div>
    );
}
