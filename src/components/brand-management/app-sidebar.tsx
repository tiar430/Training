"use client";

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Building2,
  KanbanSquare,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const menuItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/brands', label: 'Brands', icon: Building2 },
  { href: '/programs', label: 'Programs', icon: KanbanSquare },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state, toggleSidebar } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="group-data-[variant=inset]:border-r-0">
      <SidebarHeader className="h-16 flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
          <div className="p-2 rounded-lg bg-primary">
            <svg
              className="text-primary-foreground"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="font-semibold text-lg">BrandHub</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="group-data-[collapsible=icon]:flex hidden"
        >
          <LayoutDashboard />
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {menuItems.map(({ href, label, icon: Icon }) => (
            <SidebarMenuItem key={href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === href}
                tooltip={{
                  children: label,
                }}
              >
                <Link href={href}>
                  <Icon />
                  <span>{label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <div className="flex items-center gap-3 p-4">
          <Avatar className="size-9">
            <AvatarImage src="https://picsum.photos/seed/avatar/100/100" alt="User Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className={cn("flex flex-col group-data-[collapsible=icon]:hidden", { "hidden": state === "collapsed" })}>
            <span className="text-sm font-medium">User</span>
            <span className="text-xs text-muted-foreground">user@example.com</span>
          </div>
        </div>
      </SidebarFooter>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 -right-[1.5rem] transform -translate-y-1/2 rounded-full border w-6 h-12 bg-background hover:bg-background group-data-[collapsible=icon]:hidden"
        onClick={toggleSidebar}
      >
        {state === 'expanded' ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </Button>
    </Sidebar>
  );
}
