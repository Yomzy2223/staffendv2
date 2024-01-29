"use client";

import NotificationCard from "@/components/cards/notificationCard/page";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React from "react";

const Notifications = () => {
  return (
    <div>
      <Navbar fluid rounded>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">Bonnie Green</span>
              <span className="block truncate text-sm font-medium">
                name@flowbite.com
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="#" active>
            Home
          </Navbar.Link>
          <Navbar.Link href="#">About</Navbar.Link>
          <Navbar.Link href="#">Services</Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>

      <h2>Notifications</h2>
      <div>
        <div>
          <h3>Today</h3>
          <div>
            {Array(5)
              .fill("")
              .map((el, i) => (
                <NotificationCard key={i} />
              ))}
          </div>
        </div>
        <div>
          <h3>Yesterday</h3>
          <div>
            {Array(5)
              .fill("")
              .map((el, i) => (
                <NotificationCard key={i} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
