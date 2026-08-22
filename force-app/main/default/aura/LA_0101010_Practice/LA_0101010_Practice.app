<aura:application extends="force:slds" >
    
	<aura:attribute name="box2" type="Boolean" default="true" />


	<aura:handler name="change" value="{!v.box2}" action="{!c.logChange2}" />


<lightning:input name="box2" type="toggle" checked="{!v.box2}" label="The Other Box To Check" />
</aura:application>